

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="/logo.webp" className="logo" alt="Restaurant - Logo" />
                    <p>Restaurant Bewertung</p>
                </div>
                <div className="footer-links">
                    <h4>Links</h4>
                    <a href="#about">Über uns</a>
                    <a href="#contact">Kontakt</a>
                    <a href="#privacy">Datenschutz</a>
                </div>
                <div className="footer-contact">
                    <h4>Kontakt</h4>
                    <p>Email: example@example.com</p>
                    <p>Telefon: +123 456 789</p>
                </div>
                <div className="footer-social">
                    <h4>Folge uns</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
                        <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Restaurant Bewertung. Alle Rechte vorbehalten.</p>
            </div>
        </div>

    );
};

export default Footer;
