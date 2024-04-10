package com.esiwko.frusion.repo.boxes;

import com.esiwko.frusion.controller.boxes.Json;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class BoxesRepo {
    private Map<String, Json.Box> boxes = new HashMap<>();
    public Json.Box getBoxById(String boxId) {
        return boxes.get(boxId);
    }
    public void addBox(Json.Box box) {
        boxes.put(box.Id(), box);
    }

    public void archiveBox(String Id) {
        Json.Box box = boxes.get(Id);
        if (box != null) {
            box = new Json.Box(Id, box.name(), box.weight(), true);
            boxes.put(Id, box);
        }
    }

    public Collection<Json.Box> getAllBoxes() {
        return boxes.values();
    }

}
