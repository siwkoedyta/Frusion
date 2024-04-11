package com.esiwko.frusion.controller.transactions;

import java.math.BigDecimal;
import java.util.Date;


public interface Json {
    record Transaction(String id, double weightGross, String boxId, int numberOfBoxes, Date transactionDate, double weightNet, BigDecimal amount, BigDecimal price) {
    }

    record AddTransactionRequest(String userId, String fruitName, double weightGross, String boxName, int numberOfBoxes) {
    }

    record AddTransactionResponse(String id) {
    }
}