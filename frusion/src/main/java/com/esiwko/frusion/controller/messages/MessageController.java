package com.esiwko.frusion.controller.messages;

import com.esiwko.frusion.messagingrabbitmq.MessageSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    private MessageSenderService messageSenderService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody String message) {
        messageSenderService.sendMessage("amq.topic", "messages", message);
        return ResponseEntity.ok("Message sent: " + message);
    }
}