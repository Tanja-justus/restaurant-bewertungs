import "../css/Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <NavLink to="/">
                    <img src="/logo.webp" className="logo" alt="Restaurant - Logo" />
                </NavLink>
            </div>
            <nav className="nav-links">
                {/* Verwendet "end", um sicherzustellen, dass der Link nur aktiv ist, wenn der Pfad genau "/restaurant" ist */}
                <NavLink to="/" end className="nav-link">Home</NavLink>
                <NavLink to="/restaurant" end className="nav-link">Restaurants</NavLink>
                <NavLink to="/restaurant/add" className="nav-link">Neue Restaurant</NavLink>
            </nav>
        </div>
    );
}
