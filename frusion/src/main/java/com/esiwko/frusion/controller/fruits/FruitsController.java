package com.esiwko.frusion.controller.fruits;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.fruits.FruitsRepo;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.UUID;

@RestController
public class FruitsController {
    private final FruitsRepo fruitsRepo;

    public FruitsController(FruitsRepo fruitsRepo) {
        this.fruitsRepo = fruitsRepo;
    }

    @PostMapping("fruits")
    public Json.AddFruitResponse add(@RequestBody Json.AddFruitRequest req){
        var id = UUID.randomUUID().toString();
        if(req.name().isBlank()) throw new BadRequestEx("NAME_EMPTY");

        fruitsRepo.addFruit(new Json.Fruit(id, req.name(), BigDecimal.ZERO, false));
        return new Json.AddFruitResponse(id);
    }

    @DeleteMapping("fruits/{id}")
    public void remove(@PathVariable String id){
         fruitsRepo.archiveFruit(id);
    }

    @GetMapping("fruits")
    public Collection<Json.Fruit> getAll(){
        return fruitsRepo.getAllFruits();
    }

    @PutMapping("fruits/{id}/price")
    public void setPrice(@PathVariable String id, @RequestBody Json.SetPriceRequest req){
        fruitsRepo.setFruitsPrice(id, req.price());
    }

}
