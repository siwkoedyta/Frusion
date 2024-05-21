package com.esiwko.frusion.controller.messages;

import java.math.BigDecimal;

public interface Json {
    record MessageRequest(String fruitId, BigDecimal newPrice) {
    }
}
