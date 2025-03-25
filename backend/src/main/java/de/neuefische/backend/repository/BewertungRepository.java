package de.neuefische.backend.repository;

import de.neuefische.backend.model.Bewertung;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BewertungRepository extends MongoRepository<Bewertung, String> {
}
