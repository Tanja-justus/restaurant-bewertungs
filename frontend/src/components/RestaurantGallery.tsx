import {Restaurant} from "../types/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";

type RestaurantProps = {
    restaurants: Restaurant []
    onDelete: (id: string) => void;
    handleRestaurant: (restaurant: Restaurant) => void;
}
export default function RestaurantGallery(props: Readonly<RestaurantProps>) {
    console.log("RestaurantGallery props:", props);
    if (!Array.isArray(props.restaurants)) {
        return <div>Keine Restaurants verfügbar</div>;
    }

    return (
        <>
            <div className="restaurants-list">
                {props.restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id}
                                    restaurant={restaurant}
                                    onDelete={props.onDelete}
                                    handleRestaurant={props.handleRestaurant}
                    />
                ))}
            </div>
        </>
    );
}