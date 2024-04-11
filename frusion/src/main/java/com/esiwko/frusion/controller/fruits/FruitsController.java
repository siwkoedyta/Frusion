package com.esiwko.frusion.controller.fruits;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.fruits.FruitEntity;
import com.esiwko.frusion.repo.pg.fruits.FruitsPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class FruitsController {
    private final FruitsPGRepo fruitsRepo;

    @PostMapping("fruits")
    public Json.AddFruitResponse add(@CookieValue("adminId") String adminId, @RequestBody Json.AddFruitRequest req) {
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
    public Json.RemoveFruitResponse remove(@CookieValue("adminId") String adminId, @PathVariable String id) {
        fruitsRepo.setArchived(id, adminId);
        return new Json.RemoveFruitResponse(id);
    }

    @GetMapping("fruits")
    public Collection<Json.Fruit> getAll(@CookieValue("adminId") String adminId) {
        return fruitsRepo.findAllByAdminId(adminId)
                .stream().map(f -> new Json.Fruit(
                        f.getId(),
                        f.getName(),
                        f.getPrice(),
                        f.isArchived()
                )).toList();
    }

    @PutMapping("fruits/{id}/price")
    public void setPrice(@PathVariable String id, @RequestBody Json.SetPriceRequest req) {
        fruitsRepo.setPrice(id, req.price());
    }

}
