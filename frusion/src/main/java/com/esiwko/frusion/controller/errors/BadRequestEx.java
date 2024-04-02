package com.esiwko.frusion.controller.errors;

import java.util.List;

public class BadRequestEx extends RuntimeException {
    final List<String> errors;

    public BadRequestEx(String ...errors) {
        this.errors = List.of(errors);
    }
}
