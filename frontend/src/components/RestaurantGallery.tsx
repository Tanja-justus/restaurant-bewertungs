import {Restaurant} from "../types/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";

type RestauratProps = {
    restaurants: Restaurant []
    onDelete: (id: string) => void;
}
export default function RestaurantGallery(props: Readonly<RestauratProps>) {

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
                    />
                ))}
            </div>
        </>
    );
}