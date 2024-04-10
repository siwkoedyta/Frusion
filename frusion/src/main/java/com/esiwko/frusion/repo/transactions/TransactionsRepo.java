package com.esiwko.frusion.repo.transactions;

import com.esiwko.frusion.controller.transactions.Json;
import com.esiwko.frusion.repo.boxes.BoxesRepo;
import com.esiwko.frusion.repo.clients.ClientsRepo;
import com.esiwko.frusion.repo.fruits.FruitsRepo;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class TransactionsRepo {
    private Map<String, Json.Transaction> transactions = new HashMap<>();
    private final FruitsRepo fruitsRepo;
    private final BoxesRepo boxesRepo;
    private final ClientsRepo clientsRepo;

    public TransactionsRepo(FruitsRepo fruitsRepo, BoxesRepo boxesRepo, ClientsRepo clientsRepo) {
        this.fruitsRepo = fruitsRepo;
        this.boxesRepo = boxesRepo;
        this.clientsRepo = clientsRepo;
    }

    public void addTransaction(Json.Transaction transaction) {
        transactions.put(transaction.id(), transaction);
    }

    public Collection<Json.Transaction> getAllTransactions() {
        return transactions.values();
    }
}