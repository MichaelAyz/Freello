Freello is a free Trello-style project and task management application built with a fully containerized full-stack TypeScript architecture. It provides a clean, fast workflow for managing projects, organizing tasks, and tracking progress across draggable columns — powered by a modern MERN + Docker setup.

🚀 Features

🔐 User Authentication (JWT + httpOnly cookies)

🗂️ Create, Edit & Delete Projects

✅ Add, Edit, Toggle & Delete Tasks

📌 Drag-and-Drop Columns (using hello-pangea/dnd)

🎯 Project status workflow (Todo → In Progress → Completed)

📅 Project deadlines

💾 Fully persistent data (MongoDB Atlas)

🧭 Responsive UI

🐳 Full Docker support (frontend & backend in separate containers)

⚙️ Clean Context-API state management

🛠️ Tech Stack
Frontend

React

TypeScript

Vite

Backend

Node.js

Express

TypeScript

Database

MongoDB Atlas

Auth

JWT Authentication

httpOnly cookies

Secure cookie handling

State Management

React Context API

Drag and Drop

hello-pangea/dnd

Containerization

Docker

Docker Compose

Separate containers for client & server

Future Deployment Targets

Vercel / Netlify (frontend)

Render / Railway / Fly.io / AWS ECS (backend)

📁 Project Structure (Simplified)
root/
 ├── client/        # React + TS frontend
 │   ├── Dockerfile
 │   └── src/...
 ├── server/        # Express + TS backend
 │   ├── Dockerfile
 │   └── src/...
 ├── docker-compose.yml
 ├── README.md
 └── package.json

🔧 Environment Variables

Create a .env file in your backend (server/.env) with:

MONGO_URI=
JWT_SECRET=
PORT=         # (Used for local + docker)


Frontend only needs environment variables if you expose API URL — optional:

VITE_API_URL=

🐳 Docker Setup

Both client and server have individual Dockerfiles and are orchestrated through docker-compose.yml.

Start everything with one command
docker-compose up --build

Stop
docker-compose down


Both containers will run simultaneously, wired through Docker networking.

💻 Local Development (Without Docker)
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

📌 Core Features in Detail
Project Management

Create projects with deadlines

Move projects between statuses

Edit project titles/deadlines

View project details

Task Management

Add tasks to any project column

Edit, toggle (complete), or delete tasks

Tasks persist correctly in MongoDB

Drag-and-drop interface keeps state clean and consistent

Authentication

Secure cookie-based login

No localStorage token leaks

Auto-restores session on page refresh

🧪 Testing

(You can expand this later if you add Jest/Cypress.)

📦 Future Improvements (Roadmap)

Production-optimised Dockerfiles

CI/CD pipeline

Hosted public demo

Better UI polish

WebSockets (real-time updates)

📜 License

MIT License (you can change this anytime).

🙌 Author

Built by Michael Ayozie
A full-stack & DevOps-oriented engineer building clean, containerized web systems.