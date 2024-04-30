package com.esiwko.frusion.controller.boxes;

import com.esiwko.frusion.controller.auth.AuthDetails;
import com.esiwko.frusion.controller.auth.JwtService;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.boxes.BoxEntity;
import com.esiwko.frusion.repo.pg.boxes.BoxesPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.Collection;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class BoxesController {
    private final JwtService jwtService;
    private final BoxesPGRepo boxesRepo;

    @PostMapping("boxes")
    public Json.AddBoxResponse add(@CookieValue("accessToken") String token, @RequestBody Json.AddBoxRequest req) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);

        var id = UUID.randomUUID().toString();
        if (req.name().isBlank()) throw new BadRequestEx("NAME_EMPTY");

        val admin = new AdminEntity();
        admin.setId(adminId);

        boxesRepo.save(new BoxEntity(
                id,
                req.name(),
                req.weight(),
                admin,
                false
        ));

        return new Json.AddBoxResponse(id);
    }

    @DeleteMapping("boxes/{id}")
    public Json.RemoveBoxResponse remove(@CookieValue("accessToken") String token, @PathVariable String id) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);
        boxesRepo.setArchived(id, adminId);
        return new Json.RemoveBoxResponse(id);
    }

    @GetMapping("boxes")
    public Collection<Json.Box> getAll(@CookieValue("accessToken") String token) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);
        return boxesRepo.findAllByAdminId(adminId)
                .stream().map(b -> new Json.Box(
                        b.getId(),
                        b.getName(),
                        b.getWeight(),
                        b.isArchived()
                )).toList();
    }

    @GetMapping("/boxes/user")
    public Collection<Json.Box> getAllForUser() {
        return boxesRepo.findAll().stream()
                .map(b -> new Json.Box(
                        b.getId(),
                        b.getName(),
                        b.getWeight(),
                        b.isArchived()
                )).toList();
    }

}
