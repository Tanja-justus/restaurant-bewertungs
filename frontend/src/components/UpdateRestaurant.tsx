import axios from "axios";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Restaurant} from "../types/Restaurant.ts";

type Props = {
    restaurant: Restaurant | undefined;
    handleUpdatedRestaurant: (restaurant: Restaurant) => void;
}

export default function UpdateRestaurant(props: Props) {

    // Wenn kein Restaurant in den Props vorhanden ist, laden wir es per API anhand der ID
    const [givenRestaurant, setGivenRestaurant] = useState<Restaurant>(
        props.restaurant ? props.restaurant : { id: "", name: "", address: "", cuisine: "" }
    );

    const navigate = useNavigate();

    useEffect(() => {
        // Wenn `restaurant` nicht durch Props übergeben wurde, holen wir es mit einer API-Anfrage
        if (!props.restaurant) {
            const restaurantId = window.location.pathname.split('/').pop(); // Extrahiere die ID aus der URL
            axios.get(`/api/restaurant/${restaurantId}`)
                .then(response => {
                    setGivenRestaurant(response.data);  // Restaurant-Daten setzen
                })
                .catch(error => console.error("Fehler beim Laden des Restaurants", error));
        }
    }, [props.restaurant]);

    // Verhindern der Standard-Formularübermittlung
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveRestaurant();  // Restaurant speichern
        navigate(`/restaurant/${givenRestaurant.id}`);  // Zur Detail-Seite des Restaurants weiterleiten
    };

    // Funktion zum Speichern des Restaurants
    function saveRestaurant() {
        if (!givenRestaurant.id) {
            console.error("Fehler: Die Restaurant-ID fehlt!");
            return;
        }

        console.log("ID von gespeichertem Restaurant: " + givenRestaurant.id);
        axios
            .put(`/api/restaurant/${givenRestaurant.id}`, givenRestaurant)
            .then(() => {
                props.handleUpdatedRestaurant(givenRestaurant);  // Parent-Komponente über das Update informieren
            })
            .catch((error) => {
                console.error("Fehler beim Speichern des Restaurants: ", error);
            });
    }

    // Funktion zur Aktualisierung des Restaurant-States
    function updateGivenRestaurant(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name;
        const value = event.target.value;
        setGivenRestaurant({ ...givenRestaurant, [key]: value });
    }

    // Wenn Restaurant-Daten nicht verfügbar sind, zeigen wir eine Lade-Nachricht
    if (!givenRestaurant) {
        return <p>Lade Restaurant-Daten...</p>;
    }

    return (
        <div className="restaurant-update">
            <h2>Update your restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name des Restaurants:
                        <input
                            name="name"
                            type="text"
                            value={givenRestaurant.name}
                            onChange={event => updateGivenRestaurant(event)}
                        />
                    </label>
                    <label>Adresse:
                        <input
                            name="address"
                            type="text"
                            value={givenRestaurant.address}
                            onChange={event => updateGivenRestaurant(event)}
                        />
                    </label>
                    <label>Küche:
                        <input
                            name="cuisine"
                            type="text"
                            value={givenRestaurant.cuisine}
                            onChange={event => updateGivenRestaurant(event)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
}
