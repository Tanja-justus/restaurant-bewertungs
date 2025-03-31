import {useEffect, useState} from 'react'
import './App.css'
import {Restaurant} from "./types/Restaurant.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header.tsx";
import AddRestaurant from "./components/AddRestaurant.tsx";
import Home from "./components/Home.tsx";
import RestaurantPage from "./RestaurantPage.tsx";
import RestaurantDetails from "./components/RestaurantDetails.tsx";

function App() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [restaurant, setRestaurant] = useState<Restaurant>()
    const navigate = useNavigate();
    useEffect(() => {
        console.log("First time rendering App")
        LoadRestaurants()
    }, [])
    //Alle Restaurants anzeigen
    const LoadRestaurants = () => {
        console.log("Load Restaurants")
        axios.get("/api/restaurants")
            .then((response) => {
                console.log("Request finished")
                console.log(response.data)
                setRestaurants(response.data)
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })
    }

    function saveRestaurant(restaurant: Restaurant) {
        axios.post("/api/restaurants", restaurant)
            .then((response) => {
                console.log(response)
                LoadRestaurants()
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })
    }

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
                console.error('Fehler beim Löschen des Restaurants:', error);
                alert('Fehler beim Löschen des Restaurants');
            });
    };

    function handleRestaurant(restaurant: Restaurant) {
        setRestaurant(restaurant);
        navigate(`/restaurant/${restaurant.id}`);
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
            </Routes>
        </>
    )
}

export default App
