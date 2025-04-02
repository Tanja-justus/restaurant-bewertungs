import { Restaurant } from "../types/Restaurant.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
    handleRestaurant: (restaurant: Restaurant) => void;
    restaurant?: Restaurant;
};

export default function RestaurantDetails(props: Readonly<Props>) {
    const params = useParams();
    const id: string | undefined = params.id;
    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
        props.restaurant || null
    );

    useEffect(() => {
        if (id) {
            fetchRestaurant();
        }
    }, [id]); // Trigger effect when 'id' changes

    function fetchRestaurant() {
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => {
                setCurrentRestaurant(response.data);
            })
            .catch(() => setCurrentRestaurant(null));
    }

    if (!currentRestaurant) {
        return <div>No restaurant found</div>; // Show a message if no restaurant is found
    }

    return (
        <div className="restaurant-gallery">
            <h1>{currentRestaurant.name}</h1>
            <p>{currentRestaurant.address}</p>
            <p>{currentRestaurant.cuisine}</p>
        </div>
    );
}
