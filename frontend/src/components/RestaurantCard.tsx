import {Restaurant} from "../types/Restaurant";
import {useNavigate} from "react-router-dom";
import "../css/RestaurantCard.css";

type RestaurantCardProps = {

    restaurant: Restaurant;
    onDelete: (id: string) => void;
};

export default function RestaurantCard(props: Readonly<RestaurantCardProps>) {
    const navigate = useNavigate();
    const {restaurant} = props;

    // Navigiert zu den Detailseiten des Restaurants, wenn auf die Karte geklickt wird
    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };
    // Delete handler with confirmation
    const handleDelete = () => {
        const confirmed = window.confirm(`Möchten Sie das Restaurant "${restaurant.name}" wirklich löschen?`);
        if (confirmed) {
            props.onDelete(restaurant.id);// Call the onDelete prop to remove restaurant
        }
    };
    return (
        <div className="restaurant-card" onClick={handleClick}>
            <h3>{restaurant.name}</h3>
            <p>Küche: {restaurant.cuisine}</p>
            <p>{restaurant.address}</p>
            <button onClick={handleDelete}><i className="fas fa-trash"></i></button>
        </div>
    );
}
