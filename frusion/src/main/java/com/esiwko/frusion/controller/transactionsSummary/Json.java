package com.esiwko.frusion.controller.transactionsSummary;

import java.math.BigDecimal;
import java.util.List;

public interface Json {
    record Box(String id, String name, int quantity) {}
    record FruitSummary(String fruitId, String fruitName, BigDecimal averagePrice, List<Box> boxes, double sumWeight, BigDecimal sumAmount) {}
}