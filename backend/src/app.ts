import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.ts';
import errorMiddleware from './middleware/errorMiddleware.ts';

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

app.use('/profile', profileRoutes);

app.use(errorMiddleware);

export default app;
