package com.esiwko.frusion.controller.clients;


public interface Json {
    record Client(String id, String firstName, String lastName, String email, String password, boolean archived) {
    }

    record AddClientRequest(String firstName, String lastName, String email, String password) {
    }

    record AddClientResponse(String id) {
    }
}
