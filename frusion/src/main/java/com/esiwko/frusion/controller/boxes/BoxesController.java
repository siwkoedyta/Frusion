package com.esiwko.frusion.controller.boxes;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.inmem.boxes.BoxesRepo;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
public class BoxesController {
    private final BoxesRepo boxesRepo;

    public BoxesController(BoxesRepo boxesRepo) {
        this.boxesRepo = boxesRepo;
    }

    @PostMapping("boxes")
    public Json.AddBoxResponse add(@RequestBody Json.AddBoxRequest req) {
        var id = UUID.randomUUID().toString();
        if (req.name().isBlank()) throw new BadRequestEx("NAME_EMPTY");

        boxesRepo.addBox(new Json.Box(id, req.name(), req.weight(), false));
        return new Json.AddBoxResponse(id);
    }

    @DeleteMapping("boxes/{id}")
    public void remove(@PathVariable String Id) {
        boxesRepo.archiveBox(Id);
    }

    @GetMapping("boxes")
    public Collection<Json.Box> getAll() {
        return boxesRepo.getAllBoxes();
    }
}
