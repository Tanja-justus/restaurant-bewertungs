package de.neuefische.backend.model;

import com.mongodb.lang.Nullable;

public record Bewertung(String id,
                        String kommentar,
                        String restaurantId,
                        @Nullable Integer rating) {

    public Bewertung {
        // Validierung des Ratings
        if (rating != null && (rating < 1 || rating > 5)) {
            throw new IllegalArgumentException("Bewertung muss zwischen 1 und 5 liegen.");
        }
    }
}

