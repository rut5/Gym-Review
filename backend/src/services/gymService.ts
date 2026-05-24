import { gyms, type Gym, type Review } from "../models/gymModel.js";
import { getPool } from "../db.js";

const useDb = !!process.env.DATABASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapReview(row: any): Review {
  return {
    id: row.id as number,
    author: row.author as string,
    rating: row.rating as number,
    ...(row.comment != null && { comment: row.comment as string }),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGym(row: any, reviews: Review[]): Gym {
  return {
    id: row.id as number,
    name: row.name as string,
    location: row.location as string,
    ...(row.description != null && { description: row.description as string }),
    ...(row.image_url != null && { imageUrl: row.image_url as string }),
    reviews,
  };
}

export const getAllGyms = async (): Promise<Gym[]> => {
  if (!useDb) return gyms;

  const db = getPool();
  const { rows: gymRows } = await db.query(
    "SELECT id, name, location, description, image_url FROM gyms ORDER BY id",
  );
  const { rows: reviewRows } = await db.query(
    "SELECT id, gym_id, author, rating, comment FROM reviews",
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return gymRows.map((g: any) =>
    mapGym(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      g, reviewRows.filter((r: any) => r.gym_id === g.id).map(mapReview),
    ),
  );
};

export const getGymById = async (id: number): Promise<Gym | undefined> => {
  if (!useDb) return gyms.find((g) => g.id === id);

  const db = getPool();
  const { rows } = await db.query(
    "SELECT id, name, location, description, image_url FROM gyms WHERE id = $1",
    [id],
  );
  if (rows.length === 0) return undefined;

  const { rows: reviewRows } = await db.query(
    "SELECT id, author, rating, comment FROM reviews WHERE gym_id = $1 ORDER BY id",
    [id],
  );
  return mapGym(rows[0], reviewRows.map(mapReview));
};

export const createGym = async (
  gymData: Omit<Gym, "id" | "reviews">,
): Promise<Gym> => {
  if (!useDb) {
    const newGym: Gym = { id: gyms.length + 1, ...gymData, reviews: [] };
    gyms.push(newGym);
    return newGym;
  }

  const db = getPool();
  const { rows } = await db.query(
    "INSERT INTO gyms (name, location, description, image_url) VALUES ($1, $2, $3, $4) RETURNING id, name, location, description, image_url",
    [
      gymData.name,
      gymData.location,
      gymData.description ?? null,
      gymData.imageUrl ?? null,
    ],
  );
  return mapGym(rows[0], []);
};

export const addReviewToGym = async (
  gymId: number,
  reviewData: Omit<Review, "id">,
): Promise<Review | null> => {
  if (!useDb) {
    const gym = gyms.find((g) => g.id === gymId);
    if (!gym) return null;
    const newReview: Review = { id: gym.reviews.length + 1, ...reviewData };
    gym.reviews.push(newReview);
    return newReview;
  }

  const db = getPool();
  const gymCheck = await db.query("SELECT id FROM gyms WHERE id = $1", [gymId]);
  if (gymCheck.rows.length === 0) return null;

  const { rows } = await db.query(
    "INSERT INTO reviews (gym_id, author, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id, author, rating, comment",
    [gymId, reviewData.author, reviewData.rating, reviewData.comment ?? null],
  );
  return mapReview(rows[0]);
};
