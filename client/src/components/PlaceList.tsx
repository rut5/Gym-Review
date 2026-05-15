import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

// Fetch and display list of all places from (GET /places)
function PlaceList() {
  // UseStates
  const [places, setPlaces] = useState([]); // Stores list of places
  const [loading, setLoading] = useState(true); // Tracks if data is being fetched
  const [error, setError] = useState<string | null>(null); // Stores error messages

  // Fetch Data (MUST BE BEFORE ANY EARLY RETURNS)
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/places");
        if (!response.ok) throw new Error("Failed to fetch places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  // Early returns after useEffect
  if (loading) {
    return (
      <div className="loader-container">
        <PacmanLoader />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>; // Fixed syntax: ${error} → {error}
  if (places.length === 0) return <div>No places found.</div>;

  return (
    <>
      <h1> Places </h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            {" "}
            <Link to={`/places/${place.id}`}>{place.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlaceList;
