import { useState } from "react";
import { Restaurant } from "../types/Restaurant";
import "../css/AddRestaurant.css";
import {useNavigate} from "react-router-dom";
import Header from "./Header.tsx";
type Props = {
    saveRestaurant(restaurant: Restaurant): void;
};

function AddRestaurant(props: Readonly<Props>) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    // Funktion zum Absenden des Formulars
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Sicherstellen, dass alle Felder ausgefüllt sind
        if (name && address && cuisine) {
            // Erstelle das Restaurant-Objekt
            const newRestaurant: Restaurant = {
                id: '', // ID wird serverseitig generiert
                name,
                address,
                cuisine,
            };

            // Call the parent's saveRestaurant function
            props.saveRestaurant(newRestaurant);

            // Erfolgsmeldung setzen
            setMessage('Restaurant erfolgreich hinzugefügt!');
            navigate("/restaurant");
            // Felder zurücksetzen
            setName('');
            setAddress('');
            setCuisine('');
        } else {
            // Fehlerbehandlung, falls Felder fehlen
            setMessage('Bitte füllen Sie alle Felder aus!');
        }
    };

    return (
        <>
            <Header restaurantId={null} />

        <div className="restaurant-edit">
            <h1>Restaurant Hinzufügen</h1>
            <form onSubmit={handleSubmit} className="add-restaurant-form">
                <div>
                    <label htmlFor="name">Restaurant Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address">Adresse:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cuisine">Küche:</label>
                    <select
                        id="cuisine"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
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

                {message && <p>{message}</p>}
            </form>
        </div>
        </>
    );
}

export default AddRestaurant;
