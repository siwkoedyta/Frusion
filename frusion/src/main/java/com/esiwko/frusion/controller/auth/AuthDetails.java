package com.esiwko.frusion.controller.auth;

public record AuthDetails(Role role, String id) {
    public enum Role {
        ADMIN, USER
    }
}
