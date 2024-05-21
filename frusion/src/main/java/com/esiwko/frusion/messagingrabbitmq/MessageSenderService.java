package com.esiwko.frusion.messagingrabbitmq;

import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class MessageSenderService {
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(Object message) {
        System.out.println("Sending message: " + message);
        rabbitTemplate.convertAndSend(RabbitConfig.topicExchangeName, "foo.bar.baz", message);
    }
}