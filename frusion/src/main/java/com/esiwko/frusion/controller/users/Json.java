package com.esiwko.frusion.controller.users;


public interface Json {
    record User(String id, String firstName, String lastName, String email, String password, boolean archived) {
    }

    record AddUserRequest(String firstName, String lastName, String email, String password) {
    }

    record AddUserResponse(String id) {
    }

    record RemoveUserResponse(String id) {
    }
}
