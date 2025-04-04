package de.neuefische.backend.service;
import de.neuefische.backend.model.Cuisine;
import de.neuefische.backend.model.IdService;
import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
public class RestaurantServiceTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantService restaurantService;

    @BeforeEach
    void setUp() {
        restaurantRepository = mock(RestaurantRepository.class);
        restaurantService = new RestaurantService(restaurantRepository);
    }

    @Test
    void findAllRestaurants() {
        //GIVEN
        Restaurant r1 = new Restaurant("1", "TEST-Restaurant-1", "TEST-adresse-1", Cuisine.CHINESE);
        Restaurant r2 = new Restaurant("2", "TEST-Restaurant-2", "TEST-adresse-2", Cuisine.ITALIAN);
        when(restaurantRepository.findAll()).thenReturn(List.of(r1, r2));

        //WHEN
        List<Restaurant> actual = restaurantService.findAllRestaurants();

        //THEN
        verify(restaurantRepository).findAll();
        List<Restaurant> expected = List.of(r1, r2);
        assertEquals(expected, actual);
    }

    @Test
    void addRestaurant() {
        // given
        IdService idService = new IdService();
        String id = idService.generateRandomID();
        String name = "My Test Name";
        String address = "My test Address";
        Restaurant restaurantMocked = new Restaurant(id, name, address, Cuisine.ITALIAN);
        when(restaurantRepository.save(restaurantMocked)).thenReturn(restaurantMocked);


        // when
        Restaurant restaurantInserted = restaurantService.addRestaurant(name, address, "ITALIAN");

        // then
        verify(restaurantRepository).save(restaurantInserted);
        assertNotNull(restaurantInserted);
        assertEquals(restaurantMocked.name(), restaurantInserted.name());
        assertEquals(restaurantMocked.address(), restaurantInserted.address());
        assertEquals(restaurantMocked.cuisine(), restaurantInserted.cuisine());
        assertNotNull(restaurantInserted.id());
    }

    @Test
    void deleteRestaurantExists() {
        // GIVEN
        String restaurantId = "123";
        when(restaurantRepository.existsById(restaurantId)).thenReturn(true);

        // WHEN
        restaurantService.deleteRestaurant(restaurantId);

        // THEN
        verify(restaurantRepository).deleteById(restaurantId);
    }

    @Test
    void deleteRestaurantNotFound() {
        // GIVEN
        String restaurantId = "111";
        when(restaurantRepository.existsById(restaurantId)).thenReturn(false);

        // WHEN + THEN
        try {
            restaurantService.deleteRestaurant(restaurantId);
        } catch (IllegalArgumentException e) {
            verify(restaurantRepository, never()).deleteById(restaurantId);
        }
    }

    @Test
    void findRestaurantById_RestaurantFound_ReturnsRestaurant() {
        // GIVEN
        String restaurantId = "123";
        Restaurant restaurant = new Restaurant(restaurantId, "Test-Testrestaurant", "Test-Adresse", Cuisine.ITALIAN);

        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));
        // Restaurant found

        // WHEN
        Restaurant restaurantFound = restaurantService.findRestaurantById(restaurantId);

        // THEN
        assertNotNull(restaurantFound);
        assertEquals(restaurantId, restaurantFound.id());
        assertEquals("Test-Testrestaurant", restaurantFound.name());
    }

    @Test
    void findRestaurantById_RestaurantNotFound_ThrowsNoSuchElementException() {
        // GIVEN
        String restaurantId = "111";
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.empty()); // Restaurant nicht gefunden

        // WHEN + THEN
        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            restaurantService.findRestaurantById(restaurantId);
        });

        // Überprüfen, dass die Fehlermeldung exakt übereinstimmt
        assertEquals("Restaurant with id: " + restaurantId + " not found!", exception.getMessage());
    }

    @Test
    void updateRestaurant() {
        // GIVEN
        String id = "123";
        // Ursprüngliches Restaurant (vor der Aktualisierung)
        Restaurant restaurantToUpdate = new Restaurant("123", "test-name", "test-adresse", Cuisine.ITALIAN);

        // Das aktualisierte Restaurant
        Restaurant updatedRestaurant = new Restaurant("123", "test-name", "test-adresse-update", Cuisine.ITALIAN);

        // Mocking repository findById method to return the restaurant to update
        when(restaurantRepository.findById(id)).thenReturn(Optional.of(restaurantToUpdate));

        // Mocking repository save method to return the updated restaurant
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(updatedRestaurant);

        // WHEN
        Restaurant actual = restaurantService.updateRestaurant(restaurantToUpdate, id);

        // THEN
        // Verifiziere, dass save() mit dem richtigen Restaurant aufgerufen wurde
        ArgumentCaptor<Restaurant> captor = ArgumentCaptor.forClass(Restaurant.class);
        verify(restaurantRepository).save(captor.capture());

        // Verifiziere, dass das Restaurant korrekt aktualisiert wurde (jetzt mit der neuen Adresse)
        assertEquals("test-name", captor.getValue().name()); // Name bleibt gleich
        assertEquals("test-adresse", captor.getValue().address()); // Adresse sollte jetzt aktualisiert sein
        assertEquals(Cuisine.ITALIAN, captor.getValue().cuisine()); // Cuisine bleibt gleich

        // Überprüfe das tatsächliche Ergebnis
        assertEquals(updatedRestaurant, actual); // Teste, ob das zurückgegebene Restaurant das erwartete ist
    }


}
