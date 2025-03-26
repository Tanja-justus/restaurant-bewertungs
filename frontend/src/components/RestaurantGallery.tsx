import {Restaurant} from "../types/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";

type RestauratProps = {
    restaurants: Restaurant []
}
export default function RestaurantGallery(props: Readonly<RestauratProps>) {

    if (!Array.isArray(props.restaurants)) {
        return <div>Keine Restaurants verfügbar</div>;
    }

    return (
        <>
            <div className="workout-gallery">
                {props.restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
            </div>
        </>
    );
}