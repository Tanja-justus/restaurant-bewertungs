import {Link} from "react-router-dom";
import "../css/Home.css";
import Header from "./Header.tsx";

export default function Home() {
    return ( <><Header restaurantId={null} />

        <div className="home-container">
            <h1>Willkommen bei der Restaurant-Bewertung</h1>
            <p>Hier können Sie Restaurants hinzufügen, bewerten und entdecken!</p>

            <section className="home-content">
                {/* Karte 1 - Restaurants ansehen */}
                <div className="home-card">
                    <img src="/foto1.jpeg" alt="Restaurants ansehen" className="home-card-image" />
                    <h2>Restaurants ansehen</h2>
                    <p>Schauen Sie sich eine Liste von Restaurants an, die Sie bewerten können.</p>
                    <Link to="/restaurant" className="home-button">Zu den Restaurants</Link>
                </div>

                {/* Karte 2 - Restaurant hinzufügen */}
                <div className="home-card">
                    <img src="/fofo2.jpg" alt="Restaurant hinzufügen" className="home-card-image" />
                    <h2>Restaurant hinzufügen</h2>
                    <p>Fügen Sie ein neues Restaurant hinzu, das noch nicht in der Liste ist.</p>
                    <Link to="/restaurant/add" className="home-button">Restaurant hinzufügen</Link>
                </div>
            </section>
        </div>
        </>
    );
}
