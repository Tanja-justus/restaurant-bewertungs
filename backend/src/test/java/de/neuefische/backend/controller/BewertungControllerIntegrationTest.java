package de.neuefische.backend.controller;

import de.neuefische.backend.model.Bewertung;
import de.neuefische.backend.model.Cuisine;
import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.BewertungRepository;
import de.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class BewertungControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    BewertungRepository bewertungRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @BeforeEach
    void setUp() {
        // Clear the repository before each test to ensure a clean slate
        bewertungRepository.deleteAll();
        restaurantRepository.deleteAll();
    }
    @Test
    @DirtiesContext
    void deleteBewertung_shouldReturnNoContent_whenBewertungExists() throws Exception {
        // Given: A Bewertung exists in the repository
        Bewertung bewertung = new Bewertung("test-id", "Test kommentar", "test-restaurant-id");
        bewertungRepository.save(bewertung);

        // When: The DELETE request is performed to delete the existing Bewertung
        mockMvc.perform(delete("/api/restaurants/{restaurantId}/bewertungen/{bewertungId}", "test-restaurant-id", "test-id"))
                // Then: The status should be NoContent (204), indicating successful deletion
                .andExpect(status().isNoContent());

        // Then: Verify the Bewertung is no longer in the repository
        assertThat(bewertungRepository.existsById("test-id")).isFalse();
    }

    @Test
    void deleteBewertung_shouldReturnNotFound_whenBewertungDoesNotExist() throws Exception {
        // Given: No Bewertung exists with the id "nonexistent-id"

        // When: The DELETE request is performed with a non-existing Bewertung ID
        mockMvc.perform(delete("/api/restaurants/{restaurantId}/bewertungen/{bewertungId}", "test-restaurant-id", "nonexistent-id"))
                // Then: The status should be NotFound (404), indicating the Bewertung does not exist
                .andExpect(status().isNotFound());
    }
    @Test
    void getBewertungenByRestaurantId_shouldReturnNoContent_whenNoBewertungenExist() throws Exception {
        // Given: No Bewertungen for a given restaurant ID
        String restaurantId = "nonexistent-restaurant-id";

        // When: GET request for Bewertungen for that restaurant
        mockMvc.perform(get("/api/restaurants/{restaurantId}/bewertungen", restaurantId))
                // Then: Expect HTTP status 204 No Content (no Bewertungen found)
                .andExpect(status().isNoContent());
    }

    @Test
    void getBewertungenByRestaurantId_shouldReturnOkWithBewertungen_whenBewertungenExist() throws Exception {
        // Given: A Bewertung for a specific restaurant exists in the repository
        String restaurantId = "restaurant-1";
        bewertungRepository.save(new Bewertung("1", "Great food!", restaurantId));
        bewertungRepository.save(new Bewertung("2", "Nice ambiance!", restaurantId));

        // When: GET request to fetch Bewertungen for the restaurant
        mockMvc.perform(get("/api/restaurants/{restaurantId}/bewertungen", restaurantId))
                // Then: Expecting status 200 OK
                .andExpect(status().isOk())
                // Expecting a JSON response with two Bewertungen
                .andExpect(content().json("["
                        + "{ 'id': '1', 'kommentar': 'Great food!', 'restaurantId': 'restaurant-1' },"
                        + "{ 'id': '2', 'kommentar': 'Nice ambiance!', 'restaurantId': 'restaurant-1' }"
                        + "]"));
    }

    @Test
    void shouldReturnNoContentWhenNoBewertungenExist() throws Exception {
        // Given: No Bewertungen for this restaurant
        String restaurantId = "restaurant-2";
        restaurantRepository.save(new Restaurant("restaurant-3", "Restaurant-Test-2", "Test-Adresse-2", Cuisine.ITALIAN));

        // When: GET request to fetch Bewertungen for the restaurant
        mockMvc.perform(get("/api/restaurants/{restaurantId}/bewertungen", restaurantId))
                // Then: Expecting status 204 No Content
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldAddBewertungWhenRequestIsValid() throws Exception {
        // Given: A restaurant exists in the database
        String restaurantId = "restaurant-1";
        Restaurant restaurant = new Restaurant("restaurant-1", "Restaurant-Test-1", "Test-Adresse-1", Cuisine.ITALIAN);
        restaurantRepository.save(restaurant);

        // When: Sending a POST request to add a new Bewertung (review)
        mockMvc.perform(post("/api/restaurants/{restaurantId}/bewertungen", restaurantId)
                        .contentType(MediaType.APPLICATION_JSON)  // Ensure correct content type
                        .content("{\"kommentar\": \"Amazing service!\"}")) // JSON body with 'kommentar'
                // Then: Expecting status 201 Created
                .andExpect(status().isCreated())
                // Expecting the response body to contain the kommentar and restaurantId
                .andExpect(jsonPath("$.kommentar").value("Amazing service!"))
                .andExpect(jsonPath("$.restaurantId").value(restaurantId));

        // Verify the Bewertung was actually saved in the database
        Bewertung bewertung = bewertungRepository.findAll().get(0);
        assertThat(bewertung.kommentar()).isEqualTo("Amazing service!");
        assertThat(bewertung.restaurantId()).isEqualTo(restaurantId);
    }
    @Test
    @DirtiesContext
    void findRestaurantById_WhenRestaurantNotFound_thenStatus404() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(get("/api/restaurant/1"))
                //THEN
                .andExpect(status().isNotFound());
    }

}
