package com.esiwko.frusion.controller.errors;

import java.math.BigDecimal;
import java.util.Collection;

public interface Json {
    record BadRequestResponse(Collection<String> errors) {
    }
}
