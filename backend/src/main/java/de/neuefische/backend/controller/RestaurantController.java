package de.neuefische.backend.controller;

import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    // Alle Restaurants abrufen
    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.findAllRestaurants();
        if (restaurants.isEmpty()) {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);// 204 status wenn keine Restaurants gefunden
        }
        return new ResponseEntity<>(restaurants, HttpStatus.OK);// 200 status mit der Liste mit den Restaurants
    }
}
