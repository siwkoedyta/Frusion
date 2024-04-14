package com.esiwko.frusion.controller.auth;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminsPGRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AdminsPGRepo adminsRepo;

    @PostMapping("/auth")
    public void auth(@RequestBody Json.AuthRequest req, HttpServletResponse response) {
        val admin = adminsRepo.findByEmail(req.email())
                .filter(a -> a.getEmail().equals(req.email()))
                .orElseThrow(() -> new BadRequestEx("CREDENTIALS_INVALID"));

        response.setHeader("Set-Cookie", "adminId=" + admin.getId() + "; SameSite=None; Secure; Path=/");
    }

    @GetMapping("/auth/current")
    public Json.AuthResponse getCurrentAdmin(@CookieValue(value = "adminId", required = false) String adminId) {
        if (adminId == null) {
            throw new BadRequestEx("ADMIN_NOT_LOGGED_IN");
        }

        val admin = adminsRepo.findById(adminId)
                .orElseThrow(() -> new BadRequestEx("ADMIN_NOT_FOUND"));

        return new Json.AuthResponse(admin.getEmail(), admin.getFrusionName());
    }
}
