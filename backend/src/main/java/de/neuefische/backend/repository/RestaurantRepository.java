package de.neuefische.backend.repository;

import de.neuefische.backend.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
}
