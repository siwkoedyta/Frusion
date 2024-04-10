package com.esiwko.frusion.controller.register;

public interface Json {

    record RegisterRequest(String email, String password, String frusionName) {}
}
