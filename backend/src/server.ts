import app from "./app";
import { initDb } from "./db.js";

const port = Number(process.env.PORT ?? 4000);

async function start() {
  if (process.env.DATABASE_URL) {
    await initDb();
  }

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
