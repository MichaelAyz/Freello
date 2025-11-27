import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`\n [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Body:", req.body);
  console.log("Cookies:", req.cookies);
  next();
});

// Health check endpoint (for Docker healthcheck)
app.get("/health", (req: Request, res: Response) => {
  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  };
  res.status(200).json(healthStatus);
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mini-trello";

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection failed:", err));

app.get("/", (req: Request, res: Response) => res.send("Server is running..."));

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Allowed origins: ${allowedOrigins.join(', ')}`);
});