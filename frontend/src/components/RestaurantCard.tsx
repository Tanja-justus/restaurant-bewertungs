import { Restaurant } from "../types/Restaurant";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantCard.css";

type RestaurantCardProps = {
    restaurant: Restaurant;
    onDelete: (id: string) => void;
    handleRestaurant: (restaurant: Restaurant) => void; // Stelle sicher, dass diese Funktion als Prop übergeben wird
};

export default function RestaurantCard(props: Readonly<RestaurantCardProps>) {
    const navigate = useNavigate();
    const { restaurant, onDelete, handleRestaurant } = props;

    // Navigiert zur Detailseite
    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    // Löschen mit Bestätigung
    const handleDelete = () => {
        const confirmed = window.confirm(`Möchten Sie das Restaurant "${restaurant.name}" wirklich löschen?`);
        if (confirmed) {
            onDelete(restaurant.id);
        }
    };

    // Bearbeiten (führt Funktion aus und navigiert zur Update-Seite)
    const handleUpdate = () => {
        console.log("handle Update; id:", restaurant.id);
        if (typeof handleRestaurant === "function") {
            handleRestaurant(restaurant);
            navigate(`/restaurant/${restaurant.id}/update`); // Pfad korrigiert
        } else {
            console.error("handleRestaurant ist keine Funktion.");
        }
    };

    return (
        <div className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>Küche: {restaurant.cuisine}</p>
            <p>{restaurant.address}</p>
            <div className="button-container">
                <button onClick={handleDelete} className="delete-btn">
                    <i className="fas fa-trash"></i> Löschen
                </button>
                <button onClick={handleUpdate} className="edit-btn">
                    <i className="fas fa-edit"></i> Bearbeiten
                </button>
                <button onClick={handleClick} className="comment-btn">
                    💬 Kommentar
                </button>
            </div>
        </div>

    );
}
