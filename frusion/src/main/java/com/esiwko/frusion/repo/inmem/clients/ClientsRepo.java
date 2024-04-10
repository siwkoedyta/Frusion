package com.esiwko.frusion.repo.inmem.clients;

import com.esiwko.frusion.controller.clients.Json;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class ClientsRepo {
    private Map<String, Json.Client> clients = new HashMap<>();

    public void addClient(Json.Client client){
        clients.put(client.id(), client);
    }

    public Collection<Json.Client> getAllClients(){
        return clients.values();
    }

    public void archiveClient(String id){
        Json.Client client = clients.get(id);
        if (client != null) {
            client =  new Json.Client(id, client.firstName(), client.lastName(), client.email(), client.password(), true);
            clients.put(id, client);
        }
    }
}
