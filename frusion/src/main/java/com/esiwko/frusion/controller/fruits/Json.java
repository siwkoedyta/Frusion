package com.esiwko.frusion.controller.fruits;

import java.math.BigDecimal;

public interface Json {
    record Fruit(String id, String name, BigDecimal price, boolean archived) {
    }

    record AddFruitRequest(String name) {
    }

    record AddFruitResponse(String id) {
    }

    record SetPriceRequest(BigDecimal price) {
    }

    record RemoveFruitResponse(String id) {
    }
}
