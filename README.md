# Gym Review API

A REST API for browsing and reviewing gyms. Users can browse gyms publicly, and authenticated users can add new gyms and leave reviews.

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Render managed, `pg` driver)
- **Auth:** Auth0 (JWT / RS256)
- **Testing:** Vitest, Supertest
- **CI/CD:** GitHub Actions
- **Frontend:** React 19, Vite, TypeScript, Auth0 React SDK
- **Containerisation:** Docker, Docker Compose

---

## Deployed URLs

- **Frontend:** _add Netlify URL here_
- **Backend:** _add Render URL here_

---

## Setup

### Clone the repository

```bash
git clone https://github.com/rut5/Gym-Review.git
cd Gym-Review
```

### Install dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend — `backend/.env`

```
PORT=4000
AUTH0_AUDIENCE=https://gym-review-api
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
CLIENT_ORIGIN=http://localhost:5173

# Only needed when connecting to a real database
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Frontend — `frontend/.env`

```
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://gym-review-api
VITE_API_URL=http://localhost:4000
```

See `.env.example` in each folder for reference.

---

## Running Locally (without Docker)

Start both servers from the root:
```bash
npm run dev
```

Or individually:
```bash
npm run dev:backend   # http://localhost:4000
npm run dev:frontend  # http://localhost:5173
```

The app runs without a database in this mode — data is stored in memory and resets on restart.

---

## Running with Docker

Docker Compose starts the backend, frontend, and a local PostgreSQL database together with one command. You do not need Node.js or PostgreSQL installed on your machine.

### 1. Create a `.env` file in the repo root

```
AUTH0_AUDIENCE=https://gym-review-api
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com

VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://gym-review-api
```

### 2. Build and start everything

```bash
docker compose -f docker/docker-compose.yml up --build
```

### 3. Stop everything

```bash
docker compose -f docker/docker-compose.yml down
```

To also delete the database volume (all data):
```bash
docker compose -f docker/docker-compose.yml down -v
```

---

## Building Docker images individually

Backend:
```bash
docker build -t gym-review-backend ./backend
docker run -p 4000:4000 --env-file backend/.env gym-review-backend
```

Frontend:
```bash
docker build \
  --build-arg VITE_AUTH0_DOMAIN=your-tenant.auth0.com \
  --build-arg VITE_AUTH0_CLIENT_ID=your-client-id \
  --build-arg VITE_AUTH0_AUDIENCE=https://gym-review-api \
  --build-arg VITE_API_URL=https://your-render-backend-url \
  -t gym-review-frontend ./frontend

docker run -p 5173:80 gym-review-frontend
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/gyms` | Public | List all gyms |
| GET | `/gyms/:id` | Public | Get a single gym with reviews |
| POST | `/gyms` | Required | Add a new gym |
| POST | `/gyms/:id/reviews` | Required | Add a review to a gym |
| GET | `/profile` | Required | Get authenticated user profile |

---

## Database

The backend connects to PostgreSQL when `DATABASE_URL` is set. On first startup it automatically creates the `gyms` and `reviews` tables if they do not exist — no manual migration step needed.

Without `DATABASE_URL` (e.g. running tests or `npm run dev`) the app uses an in-memory array instead, so no database setup is required for local development or CI.

### Render PostgreSQL setup

1. Go to Render dashboard → **New → PostgreSQL** → create it (free tier)
2. Copy the **Internal Database URL**
3. In your backend service → **Environment** → add `DATABASE_URL` = that URL
4. Redeploy — the tables are created automatically on startup

---

## Testing

```bash
cd backend
npm test
```

### Integration Tests

- `GET /gyms` returns 200 with an array
- `GET /gyms/:id` returns a single gym
- `GET /gyms/:id` returns 404 for an unknown ID
- `POST /gyms` without a token returns 401
- `POST /gyms/:id/reviews` without a token returns 401
- `GET /profile` without a token returns 401

All 13 tests passing locally:

![Backend tests passing in terminal](images/terminal-backend-tests.png)

### CI Pipeline (GitHub Actions)

All 13 tests passing in CI:

![Backend Tests passing in GitHub Actions](images/github-backend-tests.png)

Render deploy triggered automatically after tests pass:

![Deploy to Render job succeeding](images/github-render-deploy.png)

---

## Authentication

Auth0 is used for authentication via `express-oauth2-jwt-bearer`. The frontend obtains a Bearer token using Auth0's React SDK and sends it in the `Authorization` header. The backend validates the RS256-signed JWT against Auth0's public JWKS on every request — no session is maintained server-side.

Protected routes require a valid token and return `401 Unauthorized` otherwise.

---

## Security

- Auth0 secrets and credentials are stored in `.env` and GitHub Secrets — never committed to the repository
- CORS is restricted to the frontend origin via `CLIENT_ORIGIN`
- The `x-powered-by` header is disabled
- Docker images are built in two stages — source code and dev tools are not included in the final image
- `DATABASE_URL` is injected at runtime by Render and is never baked into the Docker image

---
