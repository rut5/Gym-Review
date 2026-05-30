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

- **Frontend:** https://gym-review-se.netlify.app
- **Backend:** https://gym-review.onrender.com

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
  --build-arg VITE_API_URL=https://gym-review.onrender.com \
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

## Security Checklist

| # | Check | Status |
|---|-------|--------|
| 1 | No secrets committed — all in `.env` or GitHub Secrets | ✅ |
| 2 | CORS restricted to frontend's deployed URL (not `*`) | ✅ |
| 3 | Tokens never stored in `localStorage` | ✅ |
| 4 | `withCredentials: true` on all authenticated frontend requests | ✅ |
| 5 | Docker image does not contain `.env` files or `node_modules` from host | ✅ |
| 6 | Deployed backend uses HTTPS | ✅ |
| 7 | Authentication callbacks use the deployed URL, not localhost | ✅ |

**1. No secrets committed**
All secrets (`AUTH0_AUDIENCE`, `AUTH0_ISSUER_BASE_URL`, `DATABASE_URL`, etc.) are stored in `.env` files which are listed in `.gitignore`. In production, they are injected via Render's environment variables and Netlify's build environment. GitHub Actions reads them from repository secrets — no secret has ever touched the git history.

**2. CORS restricted to frontend URL**
The backend sets `origin: process.env.CLIENT_ORIGIN` in the cors middleware. In production this is set to the Netlify URL only — wildcard (`*`) is never used. This prevents other origins from making credentialed requests to the API.

**3. Tokens not in localStorage**
Auth0's React SDK stores the access token in memory (not `localStorage` or `sessionStorage`). This protects against XSS attacks that could steal tokens from browser storage. The token is passed as a `Bearer` header on each authenticated request and is never persisted to disk in the browser.

**4. `withCredentials: true`**
The axios instance in `frontend/src/services/api.ts` is created with `withCredentials: true`, which ensures credentials are included on all cross-origin requests made through it.

**5. Docker image contains no secrets or host node_modules**
The `.dockerignore` file excludes `node_modules` and `.env` from the build context, so host dependencies and secrets are never copied into the image. The backend Dockerfile uses a multi-stage build — dependencies are installed fresh inside the builder stage and only the compiled `dist/` folder and production `node_modules` are copied to the final image.

**6. HTTPS in production**
Render and Netlify both provision TLS certificates automatically. All traffic to the backend and frontend is served over HTTPS — no extra configuration was needed.

**7. Authentication callbacks use deployed URL**
The Auth0 application settings have the Netlify URL registered as an allowed callback URL and logout URL. The `AUTH0_ISSUER_BASE_URL` in production points to the Auth0 tenant — not localhost — so the token issuer and redirect flow work correctly after deployment.

---

## Reflections

**1. Why did you choose this deployment platform? What were the alternatives you considered?**

I chose Render for the backend because it supports Node.js services natively, provides a managed PostgreSQL database on a free tier, and exposes environment variables cleanly. I chose Netlify because that's the platform I'm used t owhen deploying frontend projects so I'm familiar with how it works. 

**2. What challenges did you face with Docker? How did you solve them?**

The main challenge with the backend was getting TypeScript compiled inside the container without including dev tools in the final image. I solved this with a multi-stage build — the first stage installs all dependencies and compiles TypeScript, and the second stage copies only the compiled `dist/` folder and re-installs production dependencies from scratch. For the frontend, Vite bakes environment variables into the bundle at build time, so Auth0 credentials and the API URL had to be passed as `ARG`/`ENV` values in the Dockerfile rather than at runtime. The nginx configuration to serve the React SPA also required a custom `nginx.conf` to redirect all routes to `index.html` for client-side routing to work.

**3. How did you handle environment variables and secrets in production vs locally?**

Locally, I use `.env` files in the `backend/` and `frontend/` directories which are listed in `.gitignore` and never committed. For Docker Compose locally, a `.env` file in the repo root provides the shared variables. In production, secrets are stored in Render's environment variable dashboard (backend) and Netlify's build settings (frontend). GitHub Actions reads secrets from the repository's Secrets settings — they are never printed in logs and are redacted automatically by GitHub.

**4. What would you do differently if you had one more week?**

I think I would work more with the frontend and maybe try another authentication app than Auth0, just to test some more out.

**5. How did you ensure that authentication still works after deployment?**

I updated the Auth0 application settings to include the deployed Netlify URL as an allowed callback URL and logout URL before testing in production. The `CLIENT_ORIGIN` environment variable on Render was set to the Netlify URL so the CORS policy allows the frontend to reach the API. I then manually tested the full login and logout flow on the deployed URL to confirm tokens were issued, sent correctly, and accepted by the backend.

---
