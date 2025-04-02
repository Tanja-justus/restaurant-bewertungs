package de.neuefische.backend.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import de.neuefische.backend.model.Bewertung;
import de.neuefische.backend.model.IdService;
import de.neuefische.backend.repository.BewertungRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.List;
import java.util.NoSuchElementException;

class BewertungServiceTest {

    @Mock
    private BewertungRepository bewertungRepository;

    private BewertungService bewertungService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        bewertungService = new BewertungService(bewertungRepository);
    }

    @Test
    void getBewertungenByRestaurantId() {
        // GIVEN: Prepare test data
        String restaurantId = "1";
        Bewertung b1 = new Bewertung("1", "test-kommentar-1!",restaurantId);
        Bewertung b2 = new Bewertung("2", "test-kommentar-2",restaurantId);

        // Mock the repository call to return the test data
        when(bewertungRepository.findByRestaurantId(restaurantId)).thenReturn(List.of(b1, b2));

        // WHEN: Call the service method
        List<Bewertung> actual = bewertungService.getBewertungenByRestaurantId(restaurantId);

        // THEN: Verify the repository method was called and assert the result
        verify(bewertungRepository).findByRestaurantId(restaurantId); // Verify the repository was called
        List<Bewertung> expected = List.of(b1, b2); // Expected result
        assertEquals(expected, actual); // Assert that the actual result matches the expected result
    }

    @Test
    void getBewertungenByRestaurantId_NoResults() {
        // GIVEN: No Bewertungen for this restaurantId
        String restaurantId = "999"; // Assume this restaurant doesn't have any Bewertungen
        when(bewertungRepository.findByRestaurantId(restaurantId)).thenReturn(List.of()); // Empty list

        // WHEN: Call the service method
        List<Bewertung> actual = bewertungService.getBewertungenByRestaurantId(restaurantId);

        // THEN: Assert the result is an empty list
        verify(bewertungRepository).findByRestaurantId(restaurantId);
        assertTrue(actual.isEmpty()); // Assert that the result is an empty list
    }

    @Test
    void addBewertung() {
        // given
        IdService idService = new IdService();
        String id = idService.generateRandomID();
        String kommentar = "Test kommentar";
        String  restaurantId  = "1";
        Bewertung bewertungMocked = new Bewertung("123", kommentar, restaurantId);
        when(bewertungRepository.save(bewertungMocked)).thenReturn(bewertungMocked);


        // when
        Bewertung bewertungSaved= bewertungService.addBewertung(kommentar, restaurantId);

        // then
        verify(bewertungRepository).save(bewertungSaved);
        assertNotNull(bewertungSaved);
        assertEquals(bewertungMocked.kommentar(),  bewertungSaved.kommentar());
        assertEquals(bewertungMocked.restaurantId(), bewertungSaved.restaurantId());
        assertNotNull(bewertungSaved.id());
    }

    @Test
    void deleteBewertung_Exists() {
        // GIVEN: Prepare test data
        String reviewId = "1234";

        // Mock the repository method to simulate the review existing
        when(bewertungRepository.existsById(reviewId)).thenReturn(true);

        // WHEN: Call the deleteBewertung method
        bewertungService.deleteBewertung(reviewId);

        // THEN: Verify that deleteById was called
        verify(bewertungRepository).deleteById(reviewId); // Ensure delete was called
    }

    @Test
    void deleteBewertung_NotFound() {
        // GIVEN: Prepare test data
        String bewertungId = "1234";

        // Mock the repository method to simulate the review not existing
        when(bewertungRepository.existsById(bewertungId)).thenReturn(false);

        // WHEN: Call the deleteBewertung method
        // THEN: Verify that a NoSuchElementException is thrown
        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            bewertungService.deleteBewertung(bewertungId);
        });

        // Verify the exception message
        assertEquals("Bewertung mit id: 1234 nicht gefunden!", exception.getMessage());
    }
}
