import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type ReviewProps = {
  placeId: string;
};

function ReviewForm({ placeId }: ReviewProps) {
  const [rating, setRatings] = useState(null);
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
