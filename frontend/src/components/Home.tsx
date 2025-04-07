import {Link} from "react-router-dom";
import "../css/Home.css";

export default function Home() {
    return (
        <div className="home-container">
                <h1>Willkommen bei der Restaurant-Bewertung</h1>
                <p>Hier können Sie Restaurants hinzufügen, bewerten und entdecken!</p>
            <section className="home-content">
                <div className="home-card">
                    <h2>Restaurants ansehen</h2>
                    <p>Schauen Sie sich eine Liste von Restaurants an, die Sie bewerten können.</p>
                    <Link to="/restaurant" className="home-button">Zu den Restaurants</Link>
                </div>

                <div className="home-card">
                    <h2>Restaurant hinzufügen</h2>
                    <p>Fügen Sie ein neues Restaurant hinzu, das noch nicht in der Liste ist.</p>
                    <Link to="/restaurant/add" className="home-button">Restaurant hinzufügen</Link>
                </div>
            </section>
        </div>
    );
}
