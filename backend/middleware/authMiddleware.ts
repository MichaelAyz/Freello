import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";



export interface AuthRequest extends Request {
  user?: { id: string };
}

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token (cookie missing)" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !("id" in decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: (decoded as JwtPayload & { id: string }).id };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Invalid or expired token" });


  }
};
