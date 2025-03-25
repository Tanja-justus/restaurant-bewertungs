package de.neuefische.backend.service;

import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.BewertungRepository;
import de.neuefische.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestautantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private BewertungRepository bewertungRepository;

    // Alle Restaurants zurückgeben
    public List<Restaurant> findAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
