import "../css/Header.css"
import {NavLink, useNavigate} from "react-router";

export default function Header() {

    return (
        <div className="header">
            <div className="logo-container">
                <NavLink to="/">
                    <img src="/logo.webp" className="logo" alt="Restaurant - Logo" />
                </NavLink>
            </div>
            <nav className="nav-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/restaurant" className="nav-link">Restaurants</NavLink>
                <NavLink to="/restaurant/add" className="nav-link">Neue Restaurant</NavLink>
            </nav>
        </div>
    )
}