package de.neuefische.backend.service;

import de.neuefische.backend.model.Cuisine;
import de.neuefische.backend.model.IdService;
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
        this.restaurantRepository = restaurantRepository;
    }

    // Alle Restaurants zurückgeben
    public List<Restaurant> findAllRestaurants() {
        return restaurantRepository.findAll();
    }

    //neue Restaurant anliegen

    public Restaurant addRestaurant(String name, String address, String cuisine) {
        // Zufällige ID generieren
        IdService idService = new IdService();
        String id = idService.generateRandomID();

        // Die Cuisine als Enum setzen
        Cuisine restaurantCuisine;
        try {
            restaurantCuisine = Cuisine.valueOf(cuisine.toUpperCase()); // Um sicherzustellen, dass die Eingabe korrekt ist
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Ungültige Küche: " + cuisine);
        }

        // Restaurant erstellen
        Restaurant restaurant = new Restaurant(id, name, address, restaurantCuisine);

        // Restaurant speichern
        restaurantRepository.save(restaurant);

        return restaurant;
    }
}
