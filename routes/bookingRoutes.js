import express from "express";
import multer from "multer";
import Booking from "../models/Booking.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// File upload config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "kha-bookings",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

router.get("/test", (req, res) => {
    res.json({ success: true, message: "Booking API working" });
  });
  
// POST booking form
router.post(
  "/",
  upload.fields([
    { name: "passportImage" },
    { name: "photo" }
  ]),
  async (req, res) => {
    try {
     
      const booking = new Booking({
        ...req.body,
        passportImage: req.files?.passportImage?.[0]?.path,
        photo: req.files?.photo?.[0]?.path,
      });
      

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Booking saved successfully",
      });
      
      
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export default router;
