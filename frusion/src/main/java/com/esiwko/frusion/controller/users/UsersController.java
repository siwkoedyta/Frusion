package com.esiwko.frusion.controller.users;

import com.esiwko.frusion.controller.auth.AuthDetails;
import com.esiwko.frusion.controller.auth.JwtService;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.users.UserEntity;
import com.esiwko.frusion.repo.pg.users.UsersPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final JwtService jwtService;
    private final UsersPGRepo usersRepo;

    @PostMapping("clients")
    public Json.AddUserResponse add(@CookieValue("accessToken") String token, @RequestBody Json.AddUserRequest req) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);

        var id = UUID.randomUUID().toString();
        if (req.firstName().isBlank() || req.lastName().isBlank() || req.email().isBlank() || req.password().isBlank()) throw new BadRequestEx("NAME_EMPTY");

        val admin = new AdminEntity();
        admin.setId(adminId);

        usersRepo.save(new UserEntity(
                id,
                req.firstName(),
                req.lastName(),
                req.email(),
                req.password(),
                admin,
                false
        ));

        return new Json.AddUserResponse(id);
    }

    @DeleteMapping("clients/{id}")
    public Json.RemoveUserResponse remove(@CookieValue("accessToken") String token, @PathVariable String id) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);
        usersRepo.setArchived(id, adminId);
        return new Json.RemoveUserResponse(id);
    }

    @GetMapping("clients")
    public Collection<Json.User> getAll(@CookieValue("accessToken") String token) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);
        return usersRepo.findAllByAdminId(adminId)
                .stream().map(u -> new Json.User(
                        u.getId(),
                        u.getFirst_name(),
                        u.getLast_name(),
                        u.getEmail(),
                        u.getPassword(),
                        u.isArchived()
                )).toList();
    }
}
