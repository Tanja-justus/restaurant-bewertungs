package de.neuefische.backend.repository;

import de.neuefische.backend.model.Bewertung;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BewertungRepository extends MongoRepository<Bewertung, String> {
    // Method to find Bewertungen by the restaurantId
    List<Bewertung> findByRestaurantId(String restaurantId);
}
