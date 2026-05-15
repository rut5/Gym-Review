import { useState } from "react";
import "./ReviewForm.css";

type ReviewProps = {
  placeId: string;
};

function ReviewForm({ placeId }: ReviewProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null || rating < 1 || rating > 5) return;

    const reviewData = { rating, comment };
    await fetch(`/places/${placeId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="rating">Rating (1-5):</label>
        <select
          id="rating"
          value={rating || ""}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-select"
          required
        >
          <option value="" disabled>
            Select a rating
          </option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comment">Your Review:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment-textarea"
          placeholder="Share your experience..."
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
