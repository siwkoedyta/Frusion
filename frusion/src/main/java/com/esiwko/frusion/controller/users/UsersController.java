package com.esiwko.frusion.controller.users;

import com.esiwko.frusion.repo.users.UsersRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {
    private final UsersRepo usersRepo;

    public UsersController(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @GetMapping("users")
    public List<Json.User> getUsers() {
        return usersRepo.getUsers();
    }

    @PostMapping("users")
    public void addUser(@RequestBody Json.User user) {
        usersRepo.addUser(user);
    }
}
