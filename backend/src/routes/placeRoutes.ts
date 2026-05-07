import express from "express";

import {
  getPlaces,
  getSinglePlace,
  createNewPlace,
  createReview,
} from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getPlaces);

router.get("/:id", getSinglePlace);

router.post("/", createNewPlace);

router.post("/:id/reviews", createReview);

export default router;

/*
GET    /places
GET    /places/:id
POST   /places
POST   /places/:id/reviews
*/
