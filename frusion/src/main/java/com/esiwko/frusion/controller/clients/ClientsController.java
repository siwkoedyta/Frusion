package com.esiwko.frusion.controller.clients;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.clients.ClientsRepo;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
public class ClientsController {
    private final ClientsRepo clientsRepo;

    public ClientsController(ClientsRepo clientsRepo) {
        this.clientsRepo = clientsRepo;
    }

    @PostMapping("clients")
    public Json.AddClientResponse add(@RequestBody Json.AddClientRequest req) {
        var id = UUID.randomUUID().toString();
        if (req.firstName().isBlank() || req.lastName().isBlank() || req.email().isBlank() || req.password().isBlank()) {
            throw new BadRequestEx("Missing required fields");
        }

        clientsRepo.addClient(new Json.Client(id, req.firstName(), req.lastName(), req.email(), req.password(), false));
        return new Json.AddClientResponse(id);
    }

    @DeleteMapping("clients/{id}")
    public void remove(@PathVariable String id) {
        clientsRepo.archiveClient(id);
    }

    @GetMapping("clients")
    public Collection<Json.Client> getAllClients() {
        return clientsRepo.getAllClients();
    }
}
