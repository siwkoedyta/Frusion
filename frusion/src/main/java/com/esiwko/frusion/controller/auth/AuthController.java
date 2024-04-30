package com.esiwko.frusion.controller.auth;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.admins.AdminsPGRepo;
import com.esiwko.frusion.repo.pg.users.UserEntity;
import com.esiwko.frusion.repo.pg.users.UsersPGRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AdminsPGRepo adminsRepo;
    private final UsersPGRepo usersRepo;
    private final JwtService jwtService;

    @PostMapping("/auth")
    public void auth(@RequestBody Json.AuthRequest req, HttpServletResponse response) {
        val authDetails = adminsRepo.findByEmail(req.email())
                .filter(a -> a.getPassword().equals(encryptPassword(req.password())))
                .map(a -> new AuthDetails(AuthDetails.Role.ADMIN, a.getId()))
                .or(() -> usersRepo.findByEmail(req.email())
                        .filter(u -> u.getPassword().equals(encryptPassword(req.password())))
                        .map(u -> new AuthDetails(AuthDetails.Role.USER, u.getId())))
                .orElseThrow(() -> new BadRequestEx("INVALID_CREDENTIAL"));

        val token = jwtService.create(authDetails);
        response.setHeader("Set-Cookie", "accessToken=" + token + "; SameSite=None; Secure; Path=/");
    }

    @GetMapping("/auth/current")
    public Json.AuthResponse getCurrentAdmin(@CookieValue(value = "accessToken") String token) {
        val authDetails = jwtService.verify(token);
        val response = switch (authDetails.role()) {
            case ADMIN -> {
                AdminEntity admin = adminsRepo.findById(authDetails.id())
                        .orElseThrow(() -> new BadRequestEx("ADMIN_NOT_FOUND"));
                yield new Json.AuthResponse(admin.getEmail(), authDetails.role().name(), admin.getFrusionName());
            }
            case USER -> {
                String email = usersRepo.findById(authDetails.id())
                        .map(UserEntity::getEmail)
                        .orElseThrow(() -> new BadRequestEx("USER_NOT_FOUND"));
                yield new Json.AuthResponse(email, authDetails.role().name(), null);
            }
        };

        return response;
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
            throw new RuntimeException("Encryption algorithm not found", e);
        }
    }
}