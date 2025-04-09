import {useState, useEffect} from 'react';
import {Restaurant} from '../types/Restaurant';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
type UpdateRestaurantProps = {
    restaurant: Restaurant;  // Das Restaurant ist nun immer verfügbar und nicht optional
    handleUpdatedRestaurant: (restaurant: Restaurant) => void;
};

export default function UpdateRestaurant({restaurant, handleUpdatedRestaurant}: UpdateRestaurantProps) {
    const [updatedRestaurant, setUpdatedRestaurant] = useState<Restaurant>(restaurant); // Zustand direkt mit den übergebenen Restaurant-Daten initialisieren
    const navigate = useNavigate();

    useEffect(() => {
        if (restaurant) {
            setUpdatedRestaurant(restaurant);  // Wenn das Restaurant neu übergeben wird, aktualisiere den Zustand
        }
    }, [restaurant]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setUpdatedRestaurant((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // SaveRestaurant wird jetzt direkt hier aufgerufen
        axios.put(`/api/restaurant/${updatedRestaurant.id}`, updatedRestaurant)
            .then(() => {
                handleUpdatedRestaurant(updatedRestaurant);  // Callback zum Aktualisieren des übergeordneten Zustands
                navigate(`/restaurant`);// Navigiere zur  Restaurants
                window.location.reload()
            })
            .catch((error) => {
                console.error('Fehler beim Aktualisieren des Restaurants', error);
            });
    };

    if (!updatedRestaurant) {
        return <div>Lädt...</div>;
    }

    return (
        <div className="restaurant-edit">
            <h1>Restaurant Aktualisieren</h1>
            <form onSubmit={handleSubmit} className="add-restaurant-form">
                <div>
                    <label htmlFor="name">Restaurant Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedRestaurant.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address">Adresse:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={updatedRestaurant.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cuisine">Küche:</label>
                    <select
                        id="cuisine"
                        name="cuisine"
                        value={updatedRestaurant.cuisine}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Wählen Sie eine Küche</option>
                        <option value="ITALIAN">Italienisch</option>
                        <option value="CHINESE">Chinesisch</option>
                        <option value="INDIAN">Indisch</option>
                        <option value="MEXICAN">Mexikanisch</option>
                        <option value="FRENCH">Französisch</option>
                    </select>
                </div>

                <button type="submit">Speichern</button>
            </form>
        </div>
    );
}
