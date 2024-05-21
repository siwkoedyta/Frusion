package com.esiwko.frusion.messagingrabbitmq;

import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Log4j2
@EnableScheduling
public class MessageReceiverService {

    private ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void receiveMessage(Object message) {
        System.out.println("Received message");
        emitters.values().forEach(emitter -> sendMsg(emitter,message));
    }

    public void addEmitter(String id, SseEmitter emitter) {
        emitters.put(id, emitter);
        sendMsg(emitter, new Msg("CONNECTED", null));
    }

    public void removeEmitter(String id) {
        emitters.remove(id);
    }

    private void sendMsg(SseEmitter emitter, Object msg) {
        try {
            emitter.send(msg);
        } catch (IOException e) {
            log.error("Error while emitting message msg");
        }
    }

//    @Scheduled(fixedDelay = 10000)
//    public void ping() {
//        receiveMessage(new Ping("PING"));
//    }
//

    record Msg(String type, Object msg) {
    }

}