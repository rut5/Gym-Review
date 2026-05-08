import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const params = useParams();
  const id = params.id;

  const [rating, setRatings] = useState(null);
  const [comment, setComments] = useState("");

  // Prevent default form submission
  const handleSubmit = async (e) => {
    // Stops the page to refresh when the form is submitted
    e.preventDefault();

    // Rating from 1-5
    if (rating < 1 || rating > 5) return;
    const reviewData = { rating, comment };

    // Creates a new review in db for a specific place. Sends a POST req to backend.
    const response = await fetch(`/places/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, // Tells the server the data is JSON
      body: JSON.stringify(reviewData), // Converts { rating, comment } to a JSON string
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={rating}
          onChange={(e) => setRatings(Number(e.target.value))}
        />
        <textarea
          value={comment}
          onChange={(e) => setComments(e.target.value)}
        />
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default ReviewForm;
