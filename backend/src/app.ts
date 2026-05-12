<<<<<<< HEAD
import "dotenv/config";
import express from "express";
import cors from "cors";
<<<<<<< HEAD
import profileRoutes from "./routes/profileRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import placeRoutes from "./routes/placeRoutes.js";
=======
import profileRoutes from "./routes/profileRoutes";
import placeRoutes from "./routes/placeRoutes";
import requireAuth from "./middleware/authMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";
>>>>>>> origin/main
=======
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes';
import placeRoutes from './routes/placeRoutes';
import requireAuth from './middleware/authMiddleware';
import errorMiddleware from './middleware/errorMiddleware';
>>>>>>> parent of 9f4a98a (Merge pull request #6 from MiniMinaa/feature/frontendSetup)

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

app.disable('x-powered-by');

app.use(cors({
  origin: clientOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

<<<<<<< HEAD
app.use("/profile", profileRoutes);
<<<<<<< HEAD
app.use("/places", placeRoutes);
=======

app.use(
  "/gyms",
  (req, res, next) => {
    if (req.method === "POST") return requireAuth(req, res, next);
    next();
  },
  placeRoutes,
);
>>>>>>> origin/main
=======
app.use('/profile', profileRoutes);

app.use('/gyms', (req, res, next) => {
  if (req.method === 'POST') return requireAuth(req, res, next);
  next();
}, placeRoutes);
>>>>>>> parent of 9f4a98a (Merge pull request #6 from MiniMinaa/feature/frontendSetup)

app.use(errorMiddleware);

export default app;
