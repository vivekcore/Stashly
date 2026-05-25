# Stashly

Full-stack content management app with a rich text editor. Save links from YouTube, Twitter, LinkedIn. Write notes with Tiptap.

## Screenshots

![Dashboard](frontend/src/assets/Screenshot%202026-05-25%20171940.png)
![Text Editor](frontend/src/assets/Screenshot%202026-05-25%20172048.png)
![Notes List](frontend/src/assets/Screenshot%202026-05-25%20172355.png)

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite, TailwindCSS v4 |
| Editor | Tiptap 3 (StarterKit, Highlight, TextAlign, Image, TaskList, Superscript/Subscript) |
| State | Redux Toolkit |
| Backend | Express 5, TypeScript |
| Database | MongoDB + Mongoose 9 |
| Auth | Better-Auth (Google / GitHub OAuth) |
| Validation | Zod |
| Icons | Lucide React |
| Notifications | React Toastify |

## Features

- Save content from YouTube, Twitter, LinkedIn with auto-embeds
- Rich text editor with headings, lists, code blocks, text alignment, color highlight, images, links
- Notes list with create/edit/delete, auto-save (2s debounce)
- Authentication via Google / GitHub OAuth
- Share individual content items via public slug URL
- Responsive layout (sidebar desktop, pill nav mobile)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Install

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL, Better-Auth secrets, FRONTEND_URL
npm run dev

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

### Environment

Backend `.env`:

```
DATABASE_URL=mongodb+srv://...
PORT=3000
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Frontend `.env`:

```
VITE_API_URL=http://localhost:3000
```

## API Endpoints

All routes under `/api/v1`.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /auth/* | - | Better-Auth handlers |
| POST | /content/add | Yes | Save a link |
| GET | /content/my | Yes | List saved content |
| GET | /content/websitetype | Yes | Filter by website |
| DELETE | /content/My | Yes | Delete content |
| GET | /content/:slug | - | Shared content by slug |
| POST | /note/create | Yes | Create a note |
| PATCH | /note/update/:noteId | Yes | Update a note |
| DELETE | /note/delete/:noteId | Yes | Delete a note |
| GET | /note/my-note/:noteId | Yes | Get a single note |
| GET | /note/my-note-bulk | Yes | List notes (paginated) |

## Project Structure

```
Stashly/
├── backend/
│   └── src/
│       ├── index.ts              # Server entry
│       ├── auth/auth.ts          # Better-Auth config
│       ├── db/db.ts              # MongoDB connection
│       ├── models/               # Mongoose schemas
│       ├── routes/               # Express routers
│       ├── controllers/          # Route handlers
│       ├── services/             # Business logic
│       ├── middlewares/          # Auth, validation, error
│       ├── validations/          # Zod schemas
│       └── utils/                # Config, helpers
├── frontend/
│   └── src/
│       ├── app/                  # Store, router
│       ├── features/             # Feature modules
│       │   ├── auth/             # Login, logout
│       │   ├── content/          # Saved links CRUD
│       │   ├── editor/           # Tiptap editor, notes list
│       │   ├── shell/            # Layout, sidebar, header
│       │   └── marketing/        # Landing page
│       ├── shared/               # UI components, hooks, lib
│       └── assets/               # Static assets, screenshots
├── README.md
└── plan.md
```

## Scripts

### Backend

| Command | Action |
|---------|--------|
| `npm run dev` | Build + start with nodemon |
| `npm run build` | TypeScript compile |
| `npm start` | Run compiled JS |

### Frontend

| Command | Action |
|---------|--------|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | TypeScript check + Vite build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |
