import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm/ReviewForm";

// Display data about a specific place (name, location etc)
function PlaceInfo() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlace = async () => {
    try {
      const response = await fetch(`http://localhost:3000/place/${id}`);
      if (!response.ok) throw new Error("Failed to find data");
      const data = await response.json();
      setPlace(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!place) return <p>No place found</p>;

  useEffect(() => {
    fetchPlace();
  }, [id]);

  return (
    <>
      <h1>{place.name}</h1>
      <p>{place.location}</p>
      <ReviewForm placeId={id} />
    </>
  );
}

export default PlaceInfo;
