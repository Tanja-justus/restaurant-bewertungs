import { useEffect, useState } from 'react';
import './App.css';
import { Restaurant } from "./types/Restaurant.ts";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header.tsx";
import AddRestaurant from "./components/AddRestaurant.tsx";
import Home from "./components/Home.tsx";
import RestaurantPage from "./RestaurantPage.tsx";
import RestaurantDetails from "./components/RestaurantDetails.tsx";
import UpdateRestaurant from "./components/UpdateRestaurant.tsx";

function App() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>(undefined);
    const navigate = useNavigate();

    // Laden der Restaurants bei der Initialisierung
    useEffect(() => {
        console.log("First time rendering App");
        LoadRestaurants();
    }, []);

    // Funktion zum Laden aller Restaurants
    const LoadRestaurants = () => {
        console.log("Load Restaurants");
        axios.get("/api/restaurants")
            .then((response) => {
                console.log("Request finished");
                setRestaurants(response.data);
            })
            .catch((errorResponse) => {
                alert("Fehler beim Laden der Restaurants");
                console.log(errorResponse);
            });
    };

    // Funktion zum Hinzufügen eines neuen Restaurants
    function saveRestaurant(restaurant: Restaurant) {
        axios.post("/api/restaurants", restaurant)
            .then((response) => {
                console.log(response);
                LoadRestaurants();  // Nach dem Speichern die Liste neu laden
            })
            .catch((errorResponse) => {
                alert("Fehler beim Speichern des Restaurants");
                console.log(errorResponse);
            });
    }

    // Funktion zum Löschen eines Restaurants
    const deleteRestaurant = (id: string) => {
        axios
            .delete(`/api/restaurants/${id}`)
            .then((response) => {
                console.log(response);
                setRestaurants((prevRestaurants) =>
                    prevRestaurants.filter((restaurant) => restaurant.id !== id)
                );
                alert('Restaurant wurde erfolgreich gelöscht');
                navigate("/restaurant");
            })
            .catch((error) => {
                alert('Fehler beim Löschen des Restaurants');
                console.error('Fehler beim Löschen des Restaurants:', error);
            });
    };

    // Funktion für die Navigation zur Update-Seite
    function handleRestaurant(restaurant: Restaurant) {
        setRestaurant(restaurant);  // Restaurant setzen, damit es in UpdateRestaurant verfügbar ist
        navigate(`/restaurant/${restaurant.id}/update`);
    }

    // Funktion zum Aktualisieren des Restaurants
    function handleUpdatedRestaurant(restaurant: Restaurant) {
        setRestaurant(restaurant);
    }

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/restaurant"
                       element={<RestaurantPage restaurants={restaurants} onDelete={deleteRestaurant}/>}/>
                <Route
                    path="/restaurant/add"
                    element={<AddRestaurant saveRestaurant={saveRestaurant}/>}
                />
                <Route path="/restaurant/:id" element={<RestaurantDetails handleRestaurant={handleRestaurant} restaurant={restaurant}/>}/>
                <Route path="/restaurant/:id/update"
                       element={<UpdateRestaurant restaurant={restaurant} handleUpdatedRestaurant={handleUpdatedRestaurant}/>}/>
            </Routes>
        </>
    );
}

export default App;
