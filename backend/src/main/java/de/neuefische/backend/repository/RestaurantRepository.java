package de.neuefische.backend.repository;

import de.neuefische.backend.model.Bewertung;
import de.neuefische.backend.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {


}
