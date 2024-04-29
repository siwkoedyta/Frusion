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

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
        if (req.firstName().isBlank() || req.lastName().isBlank() || req.email().isBlank() || req.password().isBlank())
            throw new BadRequestEx("NAME_EMPTY");

        String hashedPassword = hashPassword(req.password());

        val admin = new AdminEntity();
        admin.setId(adminId);

        usersRepo.save(new UserEntity(
                id,
                req.firstName(),
                req.lastName(),
                req.email(),
                hashedPassword,
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

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new BadRequestEx("Encryption algorithm not found");
        }
    }
}