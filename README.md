Freello is a free Trello-style project and task management application built with a fully containerized full-stack TypeScript architecture. It provides a clean, fast workflow for managing projects, organizing tasks, and tracking progress across draggable columns — powered by a modern MERN + Docker setup.

Features
User Authentication (JWT + httpOnly cookies)
Create, Edit & Delete Projects
Add, Edit, Toggle & Delete Tasks
Drag-and-Drop Columns (using hello-pangea/dnd)
Project status workflow (Todo → In Progress → Completed)
Project deadlines
Fully persistent data (MongoDB Atlas)
Responsive UI
Full Docker support (frontend & backend in separate containers)
Clean Context-API state management

Tech Stack
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


📌 Core Features in Detail
Project Management
Create projects with deadlines
Edit project titles/deadlines
View project details
Task Management
Add tasks to any project column
Edit, toggle (complete), or delete tasks
Drag-and-drop interface keeps state clean and consistent
Authentication




Built by Michael Ayozie
A full-stack & DevOps-oriented engineer building clean, containerized web systems.