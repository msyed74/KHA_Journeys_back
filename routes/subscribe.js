import express from "express";
import Subscriber from "../models/Subscriber.js";
import {
  sendWelcomeEmail,
  sendAdminSubscriberAlert,
} from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const exists = await Subscriber.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Already subscribed" });

   
    // 1️⃣ Save subscriber FIRST (critical)
    await Subscriber.create({ email });

    // 2️⃣ Respond to client FIRST
    res.status(201).json({ message: "Subscribed successfully" });

    // 3️⃣ Send emails AFTER response (never block API)
    try {
      await sendWelcomeEmail(email);
    } catch (e) {
      console.error("❌ User email failed:", e.message);
    }

    try {
      await sendAdminSubscriberAlert(email);
    } catch (e) {
      console.error("❌ Admin email failed:", e.message);
    }

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("❌ SUBSCRIBE ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;
