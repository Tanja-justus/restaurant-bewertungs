package de.neuefische.backend.service;

import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.BewertungRepository;
import de.neuefische.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private RestaurantRepository restaurantRepository;
    private BewertungRepository bewertungRepository;
    // constructor
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository=restaurantRepository;
    }

    // Alle Restaurants zurückgeben
    public List<Restaurant> findAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
