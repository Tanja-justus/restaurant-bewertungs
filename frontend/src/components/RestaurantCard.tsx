import { Restaurant } from "../types/Restaurant";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantCard.css";
import axios from "axios";

type RestaurantCardProps = {
    restaurant: Restaurant;
};

export default function RestaurantCard(props: Readonly<RestaurantCardProps>) {
    const navigate = useNavigate();
    const { restaurant } = props;

    // Navigiert zu den Detailseiten des Restaurants, wenn auf die Karte geklickt wird
    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    // Löscht das Restaurant, wenn der Benutzer bestätigt
    const handleDelete = async () => {
        const confirmed = window.confirm("Möchten Sie dieses Restaurant wirklich löschen?");
        if (confirmed) {
            try {
                // Löscht das Restaurant, indem es die ID aus den Props verwendet
                await axios.delete(`/api/restaurants/${restaurant.id}`);
                alert("Restaurant wurde erfolgreich gelöscht");
                navigate("/restaurant");
                // Hier könntest du eine Callback-Funktion aus den Props aufrufen, um das Restaurant aus der Ansicht zu entfernen
            } catch (error) {
                console.error(error);
                alert("Fehler beim Löschen des Restaurants");
            }
        }
    };

    return (
        <div className="restaurant-card" onClick={handleClick}>
            <h3>{restaurant.name}</h3>
            <p>Küche: {restaurant.cuisine}</p>
            <p>{restaurant.address}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
