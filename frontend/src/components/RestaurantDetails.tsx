import { Restaurant } from "../types/Restaurant.ts";
import { Bewertung } from "../types/Bewertung.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/RestaurantDetails.css";
import axios from "axios";

type Props = {
    handleRestaurant: (restaurant: Restaurant) => void;
    restaurant?: Restaurant;
};

export default function RestaurantDetails(props: Readonly<Props>) {
    const params = useParams();
    const id: string | undefined = params.id;
    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(props.restaurant || null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Bewertung[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number>(1);

    useEffect(() => {
        if (id) {
            fetchRestaurant();
            fetchComments();
        }
    }, [id]);

    // Restaurant-Daten abrufen
    function fetchRestaurant() {
        setLoading(true);
        setError(null);

        axios.get(`/api/restaurant/${id}`)
            .then((response) => {
                setCurrentRestaurant(response.data);
            })
            .catch((error) => {
                setError(error.response?.status === 404 ? "Restaurant nicht gefunden" : "Fehler beim Abrufen der Restaurantdaten.");
                setCurrentRestaurant(null);
            })
            .finally(() => setLoading(false));
    }

    // Kommentare abrufen
    function fetchComments() {
        axios.get(`/api/restaurants/${id}/bewertungen`)
            .then((response) => {
                setComments(response.data);
            })
            .catch(() => {
                setError("Kommentare konnten nicht geladen werden.");
            });
    }

    // Neuen Kommentar hinzufügen
    function handleAddComment() {
        // Validierung
        if (newComment.trim() === "") {
            setError("Kommentar darf nicht leer sein.");
            return;
        }

        axios.post(`/api/restaurants/${id}/bewertungen`, { kommentar: newComment, restaurantId: id, rating: newRating })
            .then((response) => {
                setComments((prevComments) => [...prevComments, response.data]);
                setNewComment("");
                setNewRating(1);
                setError("")
            })
            .catch((err) => {
                if (err.response?.status === 400) {
                    setError("Bitte gib eine gültige Bewertung zwischen 1 und 5 ab.");
                } else {
                    setError("Fehler beim Hinzufügen des Kommentars.");
                }
            });
    }

    // Bewertung löschen
    function handleDeleteComment(bewertungId: string) {
        axios.delete(`/api/restaurants/${id}/bewertungen/${bewertungId}`)
            .then(() => {
                setComments((prevComments) => prevComments.filter(comment => comment.id !== bewertungId));
            })
            .catch(() => {
                setError("Fehler beim Löschen der Bewertung.");
            });
    }

    if (loading) return <div>Lädt...</div>;
    if (!currentRestaurant) return <div>Kein Restaurant gefunden</div>;

    return (
        <div className="home-container">
            <div className="restaurant-gallery">
                <h1>{currentRestaurant.name}</h1>
                <p><i className="fas fa-map-marker-alt"></i> {currentRestaurant.address}</p>
                <p><strong>Küche:</strong> {currentRestaurant.cuisine}</p>
            </div>

            <div className="comment-section">
                <h2>Kommentare für {currentRestaurant.name}</h2>
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <p>{comment.kommentar}</p>
                                <div className="star-rating">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <i
                                            key={index}
                                            className={`fas fa-star ${index < comment.rating ? "filled" : ""}`}
                                        ></i>
                                    ))}
                                </div>
                                <button onClick={() => handleDeleteComment(comment.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Es gibt noch keine Kommentare.</p>
                    )}
                </div>

                <div className="add-comment">
                    {error && <div className="error-message"><p>{error}</p></div>}
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Schreibe einen Kommentar..."
                    />
                    <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n} Sterne</option>
                        ))}
                    </select>
                    <button onClick={handleAddComment}>Kommentar hinzufügen</button>
                </div>
            </div>

        </div>
    );
}
