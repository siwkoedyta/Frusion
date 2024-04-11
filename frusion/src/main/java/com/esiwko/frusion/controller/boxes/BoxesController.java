package com.esiwko.frusion.controller.boxes;

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
    private final BoxesPGRepo boxesRepo;

    @PostMapping("boxes")
    public Json.AddBoxResponse add(@CookieValue("adminId") String adminId, @RequestBody Json.AddBoxRequest req) {
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
    public Json.RemoveBoxResponse remove(@CookieValue("adminId") String adminId, @PathVariable String id) {
        boxesRepo.setArchived(id, adminId);
        return new Json.RemoveBoxResponse(id);
    }

    @GetMapping("boxes")
    public Collection<Json.Box> getAll(@CookieValue("adminId") String adminId) {
        return boxesRepo.findAllByAdminId(adminId)
                .stream().map(b -> new Json.Box(
                        b.getId(),
                        b.getName(),
                        b.getWeight(),
                        b.isArchived()
                )).toList();
    }

}
