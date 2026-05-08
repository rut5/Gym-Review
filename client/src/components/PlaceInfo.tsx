import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

function PlaceInfo() {
  const params = useParams();
  const id = params.id;

  const [place, setPlace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);

  const fetchPlace = async () => {
    try {
      const response = await fetch(`http://localhost:3000/place/${id}`);
      if (!response.ok) throw new Error("Failed to find data");
      const data = await response.json;
      setPlace(data);
    } catch (err) {
      SetError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, []);

  return (
    <>
      <h1></h1>
    </>
  );
}

export default PlaceInfo;
