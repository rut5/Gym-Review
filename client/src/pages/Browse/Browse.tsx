import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import "./Browse.css";

function Browse() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/places`);
        if (!response.ok) throw new Error("Failed to fetch places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading)
    return (
      <div className="loading-message">
        <PacmanLoader cssOverride={{}} margin={2} size={25} />
      </div>
    );
  if (error) return <div className="error-message">Error: {error}</div>;
  if (places.length === 0)
    return <div className="no-places-message">No places found.</div>;

  return (
    <div className="places-container">
      <h1 className="places-title">Browse Spaces</h1>
      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <h2 className="place-name">{place.name}</h2>
            <p className="place-location">{place.location}</p>
            <div className="place-ratings">
              <span>Safety: {place.averageSafetyRating || "N/A"}/5</span>
            </div>
            <Link to={`/places/${place.id}`} className="place-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
