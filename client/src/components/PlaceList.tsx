import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Fetch and display list of all places from (GET /places)
function PlaceList() {
  // UseStates
  const [places, setPlaces] = useState([]); // Stores list of places
  const [loading, setLoading] = useState(true); // Tracks if data is being fetched
  const [error, setError] = useState(null); // Stores error messages

  // Fetch Data
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/places");
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

  if (loading) return <div>Loading...</div>; // Shows loading while fetching
  if (error) return <div>Error: ${error}</div>; // Shows error msg if failed fetch
  if (places.length === 0) return <div>No places found.</div>; // if places object is empty

  return (
    <>
      <h1> Places </h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            {" "}
            // Allowd React to uniquely identify items in a list
            <Link to={`/places/${place.id}`}>{place.name}</Link> // Go to
            /places/id: without reloading the page
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlaceList;
