import { gyms, type Gym, type Review } from "../models/gymModel.js";

export const getAllGyms = (): Gym[] => {
  return gyms;
};

export const getGymById = (id: number): Gym | undefined => {
  return gyms.find((gym) => gym.id === id);
};

export const createGym = (gymData: Omit<Gym, "id" | "reviews">): Gym => {
  const newGym: Gym = {
    id: gyms.length + 1,
    ...gymData,
    reviews: [],
  };

  gyms.push(newGym);

  return newGym;
};

export const addReviewToGym = (
  gymId: number,
  reviewData: Omit<Review, "id">,
): Review | null => {
  const gym = gyms.find((g) => g.id === gymId);

  if (!gym) {
    return null;
  }

  const newReview: Review = {
    id: gym.reviews.length + 1,
    ...reviewData,
  };

  gym.reviews.push(newReview);

  return newReview;
};
