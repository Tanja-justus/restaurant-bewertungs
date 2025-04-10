package de.neuefische.backend.model;
public record Bewertung(String id,
                        String kommentar,
                        String restaurantId,
                        int rating) {

    public Bewertung {
        // Validierung des Ratings
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Bewertung muss zwischen 1 und 5 liegen.");
        }
    }
}

