import express from "express";
import multer from "multer";
import Booking from "../models/Booking.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const router = express.Router();





// File upload config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "kha-bookings",
    resource_type: "image",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});


const upload = multer({ storage });

router.get("/test", (req, res) => {
    res.json({ success: true, message: "Booking API working" });
  });
  router.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Bookings endpoint is live",
    });
  });
  
  
// POST booking form
router.post(
  "/",
  (req, res, next) => {
    upload.fields([
      { name: "passportImage" },
      { name: "photo" }
    ])(req, res, err => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const {
        fullName,
        gender,
        dob,
        age,
        nationality,
        passportNumber,
        whatsapp,
        emergencyContact,
        packageType,
      } = req.body;

      if (
        !fullName ||
        !gender ||
        !dob ||
        !age ||
        !nationality ||
        !passportNumber ||
        !whatsapp ||
        !emergencyContact ||
        !packageType
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      if (!req.files?.passportImage || !req.files?.photo) {
        return res.status(400).json({
          success: false,
          message: "Passport image and photo are required",
        });
      }

      const booking = new Booking({
        ...req.body,
        passportImage: req.files.passportImage[0].path,
        photo: req.files.photo[0].path,
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Booking saved successfully",
      });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }
);



export default router;
