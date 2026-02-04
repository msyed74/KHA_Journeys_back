import express from "express";
import multer from "multer";
import Booking from "../models/Booking.js";

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
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
        passportImage: req.files?.passportImage?.[0]?.filename,
        photo: req.files?.photo?.[0]?.filename
      });

      await booking.save();
      res.status(201).json({ success: true, message: "Booking saved" });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export default router;
