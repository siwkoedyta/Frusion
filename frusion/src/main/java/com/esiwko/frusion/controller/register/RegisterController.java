package com.esiwko.frusion.controller.register;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.admins.AdminsPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class RegisterController {
    private final AdminsPGRepo adminsRepo;

    @PostMapping("/register")
    public void register(@RequestBody Json.RegisterRequest req) {
        val id = UUID.randomUUID().toString();
        String encryptedPassword = encryptPassword(req.password());
        adminsRepo.save(new AdminEntity(
                id,
                req.email(),
                encryptedPassword,
                req.frusionName()
        ));
    }

    private String encryptPassword(String password) {
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