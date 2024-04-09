package com.esiwko.frusion.repo.boxes;


import com.esiwko.frusion.controller.boxes.Json;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class BoxesRepo {
    private Map<String, Json.Boxes> boxes = new HashMap<>();

    public void addFruit(Json.Box fruit){
        boxes.put(fruit.id(), fruit);
    }

    public void archiveFruit(String fruitId){
        Json.Fruit fruit = fruits.get(fruitId);
        if (fruit != null) {
            fruit =  new Json.Fruit(fruitId, fruit.name(), fruit.price(), true);
            fruits.put(fruitId, fruit);
        }
    }

    public Collection<Json.Fruit> getAllFruits(){
        return fruits.values();
    }

    public void setFruitsPrice(String fruitId, BigDecimal newPrice){
        Json.Fruit fruit = fruits.get(fruitId);
        if (fruit != null) {
            fruit = new Json.Fruit(fruitId, fruit.name(), newPrice, fruit.archived());
            fruits.put(fruitId, fruit);
        }
    }

}
