import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import ReviewForm from "../components/ReviewForm";

// Display details for a single place (name, location, reviews) and the ReviewForm (if the user is logged in).
function PlaceDetails() {
  const params = useParams();
  const id = params.id;

  const fetchPlace = async () => {
    const response = await fetch(`/places/${id}`);
  };

  useEffect(() => {
    fetchPlace();
  }, []); // ensures fetchPlace runs only once when the component mounts.

  return (
    <>
      <PlaceList></PlaceList>;<ReviewForm></ReviewForm>;
    </>
  );
}
export default PlaceDetails;
