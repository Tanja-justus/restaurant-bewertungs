import { useState } from "react";
import { Restaurant } from "./types/Restaurant";
import RestaurantGallery from "./components/RestaurantGallery";
import "./css/RestaurantPage.css";
type Props = {
    restaurants: Restaurant[];
    onDelete: (id: string) => void;
}

export default function RestaurantPage(props: Props) {
    const [searchText, setSearchText] = useState("");

    // Filtere Restaurants nach Name, Adresse und Küche (optional)
    const filteredRestaurants = props.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="restaurant-page">
            <div className="search-container">
                <input
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Suchen Sie nach einem Restaurant oder Küche..."
                    value={searchText}
                    className="search-input"

                />
                <span className="material-icons search-icon">search</span>
            </div>

            {filteredRestaurants.length > 0
                ? <RestaurantGallery restaurants={filteredRestaurants} onDelete={props.onDelete}  />
                : <p>Keine Restaurants gefunden</p>
            }
        </div>
    );
}
