package com.esiwko.frusion.controller.messages;

import com.esiwko.frusion.messagingrabbitmq.MessageSenderService;

import com.esiwko.frusion.messagingrabbitmq.MessageReceiverService;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.UUID;
import java.util.concurrent.Executors;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class MessageController {

    private MessageSenderService messageSenderService;
    private MessageReceiverService receiver;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Json.MessageRequest message) {
        String fruitId = message.fruitId();

        BigDecimal newPrice = message.newPrice();
        String content = "Fruit ID: " + fruitId + ", New Price: " + newPrice;

        messageSenderService.sendMessage("tEST");

        return ResponseEntity.ok("Message sent: " + content);
    }

    @GetMapping("/messages")
    public SseEmitter streamSseMvc() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        val emitterId = UUID.randomUUID().toString();
        receiver.addEmitter(emitterId, emitter);

        emitter.onCompletion(() -> receiver.removeEmitter(emitterId));

        return emitter;
    }
}