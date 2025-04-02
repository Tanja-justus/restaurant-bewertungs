package de.neuefische.backend.controller;

import de.neuefische.backend.model.Bewertung;
import de.neuefische.backend.service.BewertungService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class BewertungController {


    private final BewertungService bewertungService;

    public BewertungController(BewertungService bewertungService) {
        this.bewertungService = bewertungService;
    }
    @GetMapping("/restaurants/{restaurantId}/bewertungen")
    public ResponseEntity<List<Bewertung>> getBewertungenByRestaurantId(@PathVariable String restaurantId) {
        List<Bewertung> bewertungen = bewertungService.getBewertungenByRestaurantId(restaurantId);
        if (bewertungen.isEmpty()) {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);// 204 status wenn keine Restaurants gefunden
        }
        return new ResponseEntity<>(bewertungen, HttpStatus.OK);
    }


    @PostMapping("/restaurants/{restaurantId}/bewertungen")
    @ResponseStatus(HttpStatus.CREATED) // 201 - Standard, when something was created
    public ResponseEntity<Bewertung> addBewertung(
            @PathVariable String restaurantId,
            @RequestBody Bewertung bewertung) {

        // Set the restaurantId to the Bewertung record
        Bewertung savedBewertung = bewertungService.addBewertung(bewertung.kommentar(), restaurantId);

        return new ResponseEntity<>(savedBewertung, HttpStatus.CREATED);
    }

    @DeleteMapping("/restaurants/{restaurantId}/bewertungen/{bewertungId}")
    public ResponseEntity<Void> deleteBewertung(
            @PathVariable String restaurantId,
            @PathVariable String bewertungId) {
        try {
            bewertungService.deleteBewertung(bewertungId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public static record BewertungRequest(String kommentar) {}
}
