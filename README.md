**Stack:** Node.js + Fastify + SQLite (backend), React + Vite + Recharts (frontend), TypeScript on both sides.

## Requirements

- **Node.js 20.12+** (the backend reads `.env` via the built-in `process.loadEnvFile`)
- npm

## Running locally

Two terminals — start the backend first, then the frontend.

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs on `http://localhost:3001`. On first start it creates the SQLite database at `backend/data/widgets.db`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App opens on `http://localhost:5173` and talks to the backend via `VITE_API_URL` (defaults to `http://localhost:3001`).

## Scripts

Both packages expose:

- `npm run dev` — start in watch mode
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run format` — Prettier (write) / `npm run format:check` (verify)

Backend also has `npm start` (runs the compiled `dist/`).

## How the functionality works

- **Chart data is randomized once, on the server, when the widget is created — then stored.** A page refresh restores the *exact same* chart, not a new random one. This is intentional: charts are stable across reloads.

- **Text widgets are editable.** Click **Edit → Save**; the content is sent to the backend and persists. Cancel discards changes. Empty content is allowed. Max length is 10,000 characters.

- **Everything persists on the backend.** Widget type, position, and data live in SQLite, so a page refresh (and even a full backend restart) restores the dashboard exactly — same widgets, same order, same chart values.

- **Loading and error states are per widget.** Each widget shows its own spinner while saving/deleting and its own error message if that action fails — one failing widget never blocks the others. If the backend becomes unreachable, the dashboard keeps showing the last loaded data and offers a **Try again** banner instead of wiping the screen.