import { Pool } from "pg";

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
};

export const initDb = async (): Promise<void> => {
  const db = getPool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS gyms (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      description TEXT,
      image_url TEXT
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,
      author VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT
    );
  `);
  console.log("Database tables ready");
};
