import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";


const setTokenCookie = (res: Response, token: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  });

};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    setTokenCookie(res, token);

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Signup successful",
    });
  } catch (err) {
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    setTokenCookie(res, token);

    return res.json({ 
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};
