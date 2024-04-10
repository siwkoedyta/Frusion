package com.esiwko.frusion.repo.fruits;

import com.esiwko.frusion.controller.fruits.Json;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@Component
public class FruitsRepo {
    private Map<String, Json.Fruit> fruits = new HashMap<>();
    public Json.Fruit getFruitById(String fruitId) {
        return fruits.get(fruitId);
    }

    public void addFruit(Json.Fruit fruit){
        fruits.put(fruit.id(), fruit);
    }

    public void archiveFruit(String id){
        Json.Fruit fruit = fruits.get(id);
        if (fruit != null) {
            fruit =  new Json.Fruit(id, fruit.name(), fruit.price(), true);
            fruits.put(id, fruit);
        }
    }

    public Collection<Json.Fruit> getAllFruits(){
        return fruits.values();
    }

    public void setFruitsPrice(String Id, BigDecimal newPrice){
        Json.Fruit fruit = fruits.get(Id);
        if (fruit != null) {
            fruit = new Json.Fruit(Id, fruit.name(), newPrice, fruit.archived());
            fruits.put(Id, fruit);
        }
    }

}
