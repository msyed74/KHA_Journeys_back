import express from "express";
import CampaignParticipant from "../models/CampaignParticipant.js";
import {
  sendCampaignConfirmation,
  sendAdminCampaignAlert,
} from "../utils/sendEmail.js";

const router = express.Router();

router.post("/participate", async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.phone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }

    // Save to MongoDB
    const participant = await CampaignParticipant.create(data);

    // Send emails
    try {
    await sendCampaignConfirmation(data);
    } catch (err) {
        console.error("user email failed :", err.message);
    }   
    try {
        await sendAdminCampaignAlert(data);
      } catch (err) {
        console.error("❌ Admin email failed:", err.message);
      }
  

    res.status(201).json({
      message: "Participation recorded",
      participant,
    });
  } catch (err) {
    console.error("❌ CAMPAIGN ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;
