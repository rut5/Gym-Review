import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Cards.css";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

function Cards() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/places/${id}`);
        if (!response.ok) throw new Error("Failed to fetch place");
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
  if (!place) return <div>Place not found.</div>;

  return (
    <div className="place-details-container">
      <h1>{place.name}</h1>
      <p>Location: {place.location}</p>
      <div className="place-ratings">
        <span>Safety: {place.averageSafetyRating || "N/A"}/5</span>
      </div>
      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {place.reviews?.length > 0 ? (
          place.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>{review.comment}</p>
              <span>Rating: {review.rating}/5</span>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* ReviewForm Section */}
      <ReviewForm placeId={id} />
    </div>
  );
}

export default Cards;
