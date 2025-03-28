package de.neuefische.backend.controller;

import de.neuefische.backend.model.Cuisine;
import de.neuefische.backend.model.Restaurant;
import de.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class RestaurantControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RestaurantRepository restaurantRepository;

    @Test
    void shouldReturnRestaurantsWhenTheyExist() throws Exception {
        Restaurant restaurant = new Restaurant("1", "Restaurant-Test-1", "Test-Adresse-1", Cuisine.ITALIAN);
        restaurantRepository.save(restaurant);
        mockMvc.perform(get("/api/restaurants"))
                .andExpect(status().isOk())  // Check if the status is 200 OK
                .andExpect(content().json("[{'id':'1', 'name':'Restaurant-Test-1', 'address':'Test-Adresse-1','cuisine':'ITALIAN'}]"));
    }

    @Test
    @DirtiesContext
    void addRestaurant() {
        // given: Nothing but the class members
        // mocked repository not needed for post mapping

        // when + then
        try {
            mockMvc.perform(MockMvcRequestBuilders
                            .post("/api/restaurants")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("""
                                    {
                                         "id": "myTestID",
                                         "name": "myTestName",
                                         "address": "myTestAddress",
                                         "cuisine": "ITALIAN"
                                    }
                                    """))
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(MockMvcResultMatchers.content().json("""
                            {
                                 "name": "myTestName",
                                 "address": "myTestAddress",
                                "cuisine": "ITALIAN"
                             }
                            """))
                    .andExpect(jsonPath("$.id").isNotEmpty());
        } catch (Exception e) {
            Assertions.fail();
        }
    }
}
