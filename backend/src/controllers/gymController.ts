import { type Request, type Response } from "express";

import {
  getAllGyms,
  getGymById,
  createGym,
  addReviewToGym,
} from "../services/gymService.js";

export const getGyms = async (_req: Request, res: Response): Promise<void> => {
  const gyms = await getAllGyms();
  res.status(200).json(gyms);
};

export const getSingleGym = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const gymId = Number(req.params.id);
  const gym = await getGymById(gymId);

  if (!gym) {
    res.status(404).json({ message: "Gym not found" });
    return;
  }

  res.status(200).json(gym);
};

export const createNewGym = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, location, description, imageUrl } = req.body;

  if (!name || !location || !imageUrl) {
    res.status(400).json({ message: "Name, location, and image are required" });
    return;
  }

  const newGym = await createGym({ name, location, description, imageUrl });
  res.status(201).json(newGym);
};

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const gymId = Number(req.params.id);
  const { author, rating, comment } = req.body;

  if (!author || typeof rating !== "number") {
    res.status(400).json({ message: "Author and rating are required" });
    return;
  }

  const review = await addReviewToGym(gymId, { author, rating, comment });

  if (!review) {
    res.status(404).json({ message: "Gym not found" });
    return;
  }

  res.status(201).json(review);
};
