package com.esiwko.frusion.controller.auth;

public interface Json {
    record AuthRequest(String email, String password) {}
    record AuthResponse(String email, String role) {}
}
