import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm/ReviewForm";

function PlaceInfo() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/places/${id}`);
        if (!response.ok) throw new Error("Failed to find data");
        const data = await response.json();
        setPlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!place) return <div>No space found.</div>; // Added a period

  return (
    <div className="place-details-container">
      <h1>{place.name}</h1>
      <p>Location: {place.location}</p> {/* Added "Location: " prefix */}
      <div className="place-ratings">
        <span>Safety: {place.averageSafetyRating || "N/A"}/5</span>
      </div>
      <ReviewForm placeId={id} />
    </div>
  );
}

export default PlaceInfo;
