package com.esiwko.frusion.controller.register;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.admins.AdminsPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class RegisterController {
    private final AdminsPGRepo adminsRepo;

    @PostMapping("/register")
    public void register(@RequestBody Json.RegisterRequest req) {
        val id = UUID.randomUUID().toString();
        adminsRepo.save(new AdminEntity(
                id,
                req.email(),
                req.password(),
                req.frusionName()
        ));
    }

}
