import { type Request, type Response } from "express";

import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  addReviewToPlace,
} from "../services/placeService.js";

export const getPlaces = (req: Request, res: Response): void => {
  const places = getAllPlaces();

  res.status(200).json(places);
};

export const getSinglePlace = (req: Request, res: Response): void => {
  const placeId = Number(req.params.id);

  const place = getPlaceById(placeId);

  if (!place) {
    res.status(404).json({
      message: "Place not found",
    });

    return;
  }

  res.status(200).json(place);
};

export const createNewPlace = (req: Request, res: Response): void => {
  const { name, location, description } = req.body;

  if (!name || !location) {
    res.status(400).json({
      message: "Name and location are required",
    });

    return;
  }

  const newPlace = createPlace({
    name,
    location,
    description,
  });

  res.status(201).json(newPlace);
};

export const createReview = (req: Request, res: Response): void => {
  const placeId = Number(req.params.id);

  const { author, rating, comment } = req.body;

  if (!author || !rating) {
    res.status(400).json({
      message: "Author and rating are required",
    });

    return;
  }

  const review = addReviewToPlace(placeId, {
    author,
    rating,
    comment,
  });

  if (!review) {
    res.status(404).json({
      message: "Place not found",
    });

    return;
  }

  res.status(201).json(review);
};
