import {useEffect, useState} from 'react'
import './App.css'
import {Restaurant} from "./types/Restaurant.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import RestaurantGallery from "./components/RestaurantGallery.tsx";
import Header from "./components/Header.tsx";
import AddRestaurant from "./components/AddRestaurant.tsx";
import Home from "./components/Home.tsx";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [restaurant, setRestaurant] = useState<Restaurant>()
    const navigate = useNavigate();
    useEffect(() => {
        console.log("First time rendering App")
        LoadRestaurants()
    }, [])
    //Alle Restaurants anzeigen
    const LoadRestaurants =()=> {
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
  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/restaurant" element={<RestaurantGallery restaurants={restaurants}/>}/>
            <Route
                path="/restaurant/add"
                element={<AddRestaurant saveRestaurant={saveRestaurant} />}
            />
        </Routes>
    </>
  )
}

export default App
