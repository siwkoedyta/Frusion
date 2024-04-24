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

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AdminsPGRepo adminsRepo;
    private final UsersPGRepo usersRepo;
    private final JwtService jwtService;

    @PostMapping("/auth")
    public void auth(@RequestBody Json.AuthRequest req, HttpServletResponse response) {
        val authDetails = adminsRepo.findByEmail(req.email())
                .filter(a -> a.getPassword().equals(req.password()))
                .map(a -> new AuthDetails(AuthDetails.Role.ADMIN, a.getId()))
                .or(() -> usersRepo.findByEmail(req.email())
                        .filter(u -> u.getPassword().equals(req.password()))
                        .map(u -> new AuthDetails(AuthDetails.Role.USER, u.getId())))
                .orElseThrow(() -> new BadRequestEx("INVALID_CREDENTIAL"));

        val token = jwtService.create(authDetails);
        response.setHeader("Set-Cookie", "accessToken=" + token + "; SameSite=None; Secure; Path=/");
    }

    @GetMapping("/auth/current")
    public Json.AuthResponse getCurrentAdmin(@CookieValue(value = "accessToken") String token) {
        val authDetails = jwtService.verify(token);
        val email = switch (authDetails.role()) {
            case ADMIN ->
                    adminsRepo.findById(authDetails.id()).map(AdminEntity::getEmail).orElseThrow(() -> new BadRequestEx("ADMIN_NOT_FOUND"));
            case USER ->
                    usersRepo.findById(authDetails.id()).map(UserEntity::getEmail).orElseThrow(() -> new BadRequestEx("USER_NOT_FOUND"));
        };

        return new Json.AuthResponse(email, authDetails.role().name());
    }
}

