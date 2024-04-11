package com.esiwko.frusion.controller.boxes;


public interface Json {
    record Box(String id, String name, double weight, boolean archived) {
    }

    record AddBoxRequest(String name, double weight) {
    }

    record AddBoxResponse(String id) {
    }

    record RemoveBoxResponse(String id){}
}
