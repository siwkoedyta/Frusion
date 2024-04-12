package com.esiwko.frusion.controller.transactionsSummary;
import com.esiwko.frusion.repo.pg.boxes.BoxEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


public interface Json {

    record TransactionsSummaryResponse(List<FruitSummary> fruitsSummaries){}
    record Box(String id, String name, int quantity){}
    record FruitSummary(String fruitId, String fruitName, BigDecimal avaragePrice, List<Box> boxes, double sumWeight){}
}
