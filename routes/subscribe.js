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

    await Subscriber.create({ email });

    await sendWelcomeEmail(email);
    await sendAdminSubscriberAlert(email);

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
