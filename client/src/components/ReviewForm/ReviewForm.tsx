import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type ReviewProps = {
  placeId: string;
};

function ReviewForm({ placeId }: ReviewProps) {
  const [rating, setRatings] = useState<number | null>(null);
  const [comment, setComments] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) return;
    const reviewData = { rating, comment };

    const token = await getAccessTokenSilently();

    const response = await fetch(`/places/${placeId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(reviewData),
    });
  };

  return (
    <>
      {/* Star rating system placeholder (replace with actual star UI later) */}
      <form onSubmit={handleSubmit}>
        <select
          value={rating ?? ""} // Fallback to empty string to avoid warning
          onChange={(e) =>
            setRatings(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="" disabled>
            Select a rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
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
