import {Restaurant} from "../types/Restaurant.ts";
import {useNavigate} from "react-router-dom";
import "../css/RestaurantCard.css";
type RestaurantCardProps = {
    restaurant: Restaurant;
}
export default function (props: Readonly<RestaurantCardProps>) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/restaurant/${props.restaurant.id}`)
    };
    return (
        <div>
            <div className="restaurant-card" onClick={handleClick}>
                <h3>{props.restaurant.name}</h3>
                <p>Küche:{props.restaurant.cuisine}</p>
                <p>{props.restaurant.address}</p>
            </div>
        </div>

    )
}