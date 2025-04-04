package de.neuefische.backend.service;

import de.neuefische.backend.model.Cuisine;
import de.neuefische.backend.model.IdService;
import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.BewertungRepository;
import de.neuefische.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;


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

    public void deleteRestaurant(String id) {

        if (!restaurantRepository.existsById(id)) {
            throw new IllegalArgumentException("Restaurant with ID " + id + " was not found."
            );
        }
        restaurantRepository.deleteById(id);
    }

    public Restaurant findRestaurantById(String id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Restaurant with id: " + id + " not found!"));
    }

    public Restaurant updateRestaurant(Restaurant restaurant, String id) {
        // 1. Restaurant mit der angegebenen ID aus der Datenbank abrufen
        Optional<Restaurant> existingRestaurant = restaurantRepository.findById(id);

        if (existingRestaurant.isPresent()) {
            // 2. Das Restaurant wurde gefunden. Erstelle ein neues Restaurant mit den neuen Werten.
            // 3. Erstelle ein neues Restaurant-Objekt mit den aktualisierten Werten
            Restaurant updatedRestaurant = new Restaurant(
                    id, // ID bleibt gleich
                    restaurant.name(), // Der Name wird aktualisiert
                    restaurant.address(), // Die Adresse wird aktualisiert
                    restaurant.cuisine() // Die Küche wird aktualisiert
            );

            // 4. Das aktualisierte Restaurant speichern und zurückgeben
            return restaurantRepository.save(updatedRestaurant);
        } else {
            // 5. Wenn das Restaurant nicht gefunden wird, eine Ausnahme werfen
            throw new NoSuchElementException("Restaurant mit der ID " + id + " nicht gefunden");
        }
    }
}