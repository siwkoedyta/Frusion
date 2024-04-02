package com.esiwko.frusion.controller.errors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HttpExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {BadRequestEx.class})
    protected ResponseEntity<Object> handle(
            BadRequestEx ex, WebRequest request) {
        return handleExceptionInternal(ex, new Json.BadRequestResponse(ex.errors),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}
