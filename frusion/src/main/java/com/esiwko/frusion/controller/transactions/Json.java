package com.esiwko.frusion.controller.transactions;

import java.math.BigDecimal;

public interface Json {
    record Transaction(String id, String clientId, String fruitId, double weight, String boxId, int quantityBoxes, BigDecimal amount) {
    }

    record AddTransactionRequest(String clientId, String fruitId, double weight, String boxId, int quantityBoxes) {
    }

    record AddTransactionResponse(String id) {
    }
}