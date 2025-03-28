package de.neuefische.backend.model;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class IdService {
    public String generateRandomID() {
        return UUID.randomUUID().toString();
    }
}
