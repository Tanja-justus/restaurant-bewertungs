 // Achte darauf, den richtigen Pfad zu deiner CSS-Datei zu verwenden.
 import "../css/Footer.css";
 export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="logo.png" alt="Restaurant Bewertung Logo" />
                    <p>&copy; 2025 Restaurant Bewertung. Alle Rechte vorbehalten.</p>
                </div>
                <div className="footer-links">
                    <h4>Links</h4>
                    <a href="/restaurant">Restaurants ansehen</a>
                    <a href="/restaurant/add">Restaurant hinzufügen</a>
                    <a href="/about">Über uns</a>
                    <a href="/contact">Kontakt</a>
                </div>
                <div className="footer-contact">
                    <h4>Kontakt</h4>
                    <p>Email: info@restaurantbewertung.de</p>
                    <p>Telefon: +49 123 456 789</p>
                </div>
                <div className="footer-social">
                    <h4>Folge uns</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Restaurant Bewertung. Alle Rechte vorbehalten.</p>
            </div>
        </footer>
    );
}
