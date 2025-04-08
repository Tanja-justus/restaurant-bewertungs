package de.neuefische.backend.controller;

import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class RestaurantController {




    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }


    // Alle Restaurants abrufen
    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.findAllRestaurants();
        if (restaurants.isEmpty()) {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);// 204 status wenn keine Restaurants gefunden
        }
        return new ResponseEntity<>(restaurants, HttpStatus.OK);// 200 status mit der Liste mit den Restaurants
    }
    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED) // 201 - Standard, when something was created
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant.name(), restaurant.address(),restaurant.cuisine().name());
    }

    @DeleteMapping("/restaurants/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable String id) {
        try {
           restaurantService.deleteRestaurant(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<Object> findRestaurantById(@PathVariable String id) {

        try {
            Restaurant restaurant = restaurantService.findRestaurantById(id);
            return ResponseEntity.ok(restaurant);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Restaurant with ID " + id + " not found.");
        }

    }
    @PutMapping("/restaurant/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Restaurant putRestaurant(@RequestBody Restaurant restaurant, @PathVariable String id)
    {
        return restaurantService.updateRestaurant(restaurant,id);
    }
}
