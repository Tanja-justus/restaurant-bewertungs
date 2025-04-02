package de.neuefische.backend.service;

import de.neuefische.backend.model.Bewertung;
import de.neuefische.backend.model.IdService;
import de.neuefische.backend.repository.BewertungRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BewertungService {
    private final BewertungRepository bewertungRepository;

    public BewertungService(BewertungRepository bewertungRepository) {
        this.bewertungRepository = bewertungRepository;
    }

    public List<Bewertung> getAllBewertungen() {

        return bewertungRepository.findAll();
    }

    //  Alle Bewertungen für ein bestimmtes Restaurant abrufen

    public List<Bewertung> getBewertungenByRestaurantId(String restaurantId) {
        return bewertungRepository.findByRestaurantId(restaurantId);
    }

    //  Einzelne Bewertung abrufen
    public Bewertung getBewertungById(String id) {
        return bewertungRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bewertung mit id: " + id + " nicht gefunden!"));
    }

    //  Neue Bewertung speichern
    public Bewertung addBewertung(  String kommentar, String restaurantId) {
        IdService idService = new IdService();
        String id = idService.generateRandomID();

        Bewertung bewertung = new Bewertung(id, kommentar, restaurantId);
      bewertungRepository.save(bewertung);

        return bewertung;
    }

    //  Bewertung löschen
    public void deleteBewertung(String id) {
        if (!bewertungRepository.existsById(id)) {
            throw new NoSuchElementException("Bewertung mit id: " + id + " nicht gefunden!");
        }
        bewertungRepository.deleteById(id);
    }
}
