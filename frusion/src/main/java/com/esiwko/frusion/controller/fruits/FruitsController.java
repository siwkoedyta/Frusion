package com.esiwko.frusion.controller.fruits;

import com.esiwko.frusion.controller.auth.AuthDetails;
import com.esiwko.frusion.controller.auth.JwtService;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.messagingrabbitmq.MessageSenderService;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.fruits.FruitEntity;
import com.esiwko.frusion.repo.pg.fruits.FruitsPGRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
public class FruitsController {
    private final JwtService jwtService;
    private final FruitsPGRepo fruitsRepo;
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private MessageSenderService messageSenderService;

    @PostMapping("fruits")
    public Json.AddFruitResponse add(@CookieValue("accessToken") String token, @RequestBody Json.AddFruitRequest req) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);

        var id = UUID.randomUUID().toString();
        if (req.name().isBlank()) throw new BadRequestEx("NAME_EMPTY");

        val admin = new AdminEntity();
        admin.setId(adminId);

        fruitsRepo.save(new FruitEntity(
                id,
                req.name(),
                BigDecimal.ZERO,
                admin,
                false
        ));

        return new Json.AddFruitResponse(id);
    }

    @DeleteMapping("fruits/{id}")
    public Json.RemoveFruitResponse remove(@CookieValue("accessToken") String token, @PathVariable String id) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);
        fruitsRepo.setArchived(id, adminId);
        return new Json.RemoveFruitResponse(id);
    }

    @GetMapping("fruits")
    public Collection<Json.Fruit> getAll(@CookieValue("accessToken") String token) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);

        return fruitsRepo.findAllByAdminId(adminId)
                .stream().map(f -> new Json.Fruit(
                        f.getId(),
                        f.getName(),
                        f.getPrice(),
                        f.isArchived()
                )).toList();
    }

    @GetMapping("/fruits/user")
    public Collection<Json.Fruit> getAllForUser() {
        return fruitsRepo.findAll().stream()
                .map(f -> new Json.Fruit(
                        f.getId(),
                        f.getName(),
                        f.getPrice(),
                        f.isArchived()
                )).toList();
    }

    @PutMapping("fruits/{id}/price")
    public void setPrice(@PathVariable String id, @RequestBody Json.SetPriceRequest req) {
        BigDecimal newPrice = req.price();

        if (newPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestEx("PRICE_CANNOT_BE_NEGATIVE");
        }
        fruitsRepo.setPrice(id, newPrice);

        Json.PriceChange priceChange = new Json.PriceChange("PRICE_CHANGED", id, newPrice, Instant.now().toEpochMilli());
        messageSenderService.sendMessage(priceChange);
    }
}