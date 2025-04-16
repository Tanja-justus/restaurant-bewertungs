import "../css/Header.css";
import { NavLink } from "react-router-dom";


type HeaderProps = {
    restaurantId: string | null; // Prop für die Restaurant-ID
};

export default function Header({ restaurantId }: HeaderProps) {
    return (
        <div className="header">
            <div className="logo-container">
                <NavLink to="/">
                    <img src="/logo.webp" className="logo" alt="Restaurant - Logo" />
                </NavLink>
            </div>
            <nav className="nav-links">
                <NavLink to="/" end className="nav-link">Home</NavLink>
                <NavLink to="/restaurant" end className="nav-link">Restaurants</NavLink>
                <NavLink to="/restaurant/add" className="nav-link">Neue Restaurant</NavLink>

                {/* Bewertungen-Menüpunkt nur anzeigen, wenn restaurantId vorhanden ist */}
                {restaurantId && (
                    <NavLink to={`/restaurant/${restaurantId}/bewertungen`} className="nav-link">
                        Bewertungen
                    </NavLink>
                )}
            </nav>
        </div>
    );
}
