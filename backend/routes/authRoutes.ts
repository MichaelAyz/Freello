import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account with that email does not exist" });
    }

    // Remember to refactor for real email service
    return res.status(200).json({ message: "A reset link has been sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
