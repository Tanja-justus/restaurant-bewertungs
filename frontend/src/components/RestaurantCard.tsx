import {Restaurant} from "../types/Restaurant.ts";
import {useNavigate} from "react-router-dom";

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
            <div className="restsursnt-card" onClick={handleClick}>
                <h3>{props.restaurant.name}</h3>
                <p>{props.restaurant.address}</p>
            </div>
        </div>

    )
}