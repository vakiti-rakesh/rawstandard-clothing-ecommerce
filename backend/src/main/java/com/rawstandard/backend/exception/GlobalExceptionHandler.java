package com.rawstandard.backend.exception;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    record ApiError(Instant timestamp, int status, String error, String message, String path) {}

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequestException ex, jakarta.servlet.http.HttpServletRequest req) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ApiError(Instant.now(), 400, "Bad Request", ex.getMessage(), req.getRequestURI())
        );
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(NotFoundException ex, jakarta.servlet.http.HttpServletRequest req) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiError(Instant.now(), 404, "Not Found", ex.getMessage(), req.getRequestURI())
        );
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiError> handleConflict(ConflictException ex, jakarta.servlet.http.HttpServletRequest req) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                new ApiError(Instant.now(), 409, "Conflict", ex.getMessage(), req.getRequestURI())
        );
    }

    // fallback
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleOther(Exception ex, jakarta.servlet.http.HttpServletRequest req) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiError(Instant.now(), 500, "Internal Server Error", "Something went wrong", req.getRequestURI())
        );
    }
}