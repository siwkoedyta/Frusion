package com.esiwko.frusion.controller.transactions;
import java.time.LocalDate;

import java.math.BigDecimal;

public interface Json {
    record Transaction(String id, double weightGross, String boxId, int numberOfBoxes, LocalDate transactionDate, double weightNet, BigDecimal amount, BigDecimal price, String fruitId) {
    }

    record AddTransactionRequest(String userId, String fruitId, double weightGross, String boxId, int numberOfBoxes) {
    }

    record AddTransactionResponse(String id) {
    }
}