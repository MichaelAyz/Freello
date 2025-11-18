# Copilot Instructions for Freello

## Project Overview

**Freello** is a project management application with a **Node.js/Express** backend and a **React** frontend. The architecture follows a monorepo pattern with `/backend` (Express API) and `/client` (React + Vite).

**Key Insight**: This is a full-stack kanban board system with user authentication and project management features.

## Architecture & Key Components

### Backend (`/backend`)

- **Framework**: Express.js (v5.1.0) with ES6 modules (`"type": "module"`)
- **Database**: MongoDB (Mongoose v8.19.3)
- **Entry Point**: `index.js`
- **Authentication**: JWT-based with bcryptjs password hashing
- **Core Models**:
  - `User` (name, email, password with timestamps)
  - `Project` (userId, title, clientName, budget, deadline, notes, status enum)
- **Status Flow**: Projects have 5 states - "Inquiry", "Proposal", "In Progress", "Review", "Completed"

### Frontend (`/client`)

- **Framework**: React 19 + Vite (v7.2.2)
- **Routing**: React Router v7.9.5
- **HTTP Client**: Axios configured at `http://localhost:5000`
- **State Management**: React Context (AuthContext for auth, ProjectContext for projects)
- **Key Components**: Login, Signup, Dashboard, Board, Column, ProjectPanel
- **Auth Flow**: localStorage persistence of `{ user, token }` via AuthContext

## Developer Workflows

### Setup & Running

```bash
# Backend
cd backend && npm install && npm run dev    # Requires MongoDB running
# Frontend (separate terminal)
cd client && npm install && npm run dev     # Vite on http://localhost:5173
```

### Critical Environment Setup

- **Backend `.env`** (required):
  - `PORT` (default: 5000)
  - `MONGO_URI` (default: mongodb://localhost:27017/mini-trello)
  - `JWT_SECRET` (default: "dev_secret" - change in production)
- **CORS** configured for `http://localhost:5173` and `http://localhost:5174`

### Important Notes

- Backend uses ES6 modules (`import`/`export`)
- MongoDB must be running before starting backend
- JWT tokens expire in 1 day (`expiresIn: "1d"`)

## Code Patterns & Conventions

### Backend Patterns

- **Route Organization**: Routes modularized in `/routes` (e.g., `authRoutes.ts`)
- **Controllers**: Business logic in `/controllers` (e.g., `authController.ts`)
- **Middleware**: Auth checks in `/middleware` (e.g., `verifyToken` in `authMiddleware.ts`)
- **Auth Middleware**: Extends `Request` with `user?: { id: string }` interface (`AuthRequest`)
- **Error Handling**: Basic try-catch in controllers; currently no global error middleware

### Frontend Patterns

- **API Calls**: All requests through `services/api.ts` (Axios instance)
- **Protected Routes**: `ProtectedRoute.tsx` wraps authenticated pages
- **Context Hooks**: AuthContext consumed directly in components (no custom hook yet)
- **TypeScript**: Used in models and components; some .tsx files mixed with .ts

### Data Flow Example (Authentication)

1. User submits login form (Login.tsx)
2. POST `/api/auth/login` via `api.ts`
3. Backend returns `{ token, user }` (authController.ts)
4. Frontend stores in AuthContext + localStorage
5. Subsequent requests include JWT in Authorization header

## Integration Points & Cross-Component Communication

### Backend Routes

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate and return JWT token
- `POST /api/auth/forgot-password` - Placeholder (needs real email service)
- Forgot-password currently returns mock response; TODO: integrate email service

### Database Schema Details

- **User**: email is unique; password hashed with bcryptjs (salt rounds: 10)
- **Project**: userId links to User.\_id; timestamps auto-added

## Quick Start for New Features

1. **Add Backend Route**: Create route handler in `/routes`, import in `index.js`
2. **Add Controller Logic**: Implement in `/controllers`, use MongoDB models
3. **Add Auth Middleware**: Wrap route with `verifyToken` middleware
4. **Add Frontend Service**: Call endpoint via `services/api.ts` with axios
5. **Update UI**: Create/update React components to consume service

## Known Limitations & TODOs

- No global error middleware on backend
- No request validation (e.g., joi/zod schemas)
- Forgot-password is a placeholder; needs email service integration
- No project/board endpoints yet (models exist, routes pending)
- AuthContext missing custom hook for cleaner consumption
- No rate limiting or request logging
