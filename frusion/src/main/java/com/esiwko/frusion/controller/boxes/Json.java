package com.esiwko.frusion.controller.boxes;


public interface Json {
    record Box(String Id, String name, double weight, boolean archived) {
    }

    record AddBoxRequest(String name, double weight) {
    }

    record AddBoxResponse(String Id) {
    }
}
