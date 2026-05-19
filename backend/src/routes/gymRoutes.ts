import express from "express";

import {
  getGyms,
  getSingleGym,
  createNewGym,
  createReview,
} from "../controllers/gymController.js";

const router = express.Router();

router.get("/", getGyms);

router.get("/:id", getSingleGym);

router.post("/", createNewGym);

router.post("/:id/reviews", createReview);

export default router;

/*
GET    /gyms
GET    /gyms/:id
POST   /gyms              (protected)
POST   /gyms/:id/reviews  (protected)
*/
