import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import bookingRoutes from "./routes/bookingRoutes.js";
import subscribeRoute from "./routes/subscribe.js";
import campaignRoutes from "./routes/campaignRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD ENV FIRST
dotenv.config({ path: path.join(__dirname, ".env") });


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://karwanehasanaskari.com",
  "https://www.karwanehasanaskari.com",
  "https://kha-journeys-qmkurnmyw-msyed74s-projects.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


app.use(customCorsMiddlewareAbove);
app.use(express.json());

app.use("/api/subscribe", subscribeRoute);
app.use("/api/bookings", bookingRoutes);
app.use("/api/campaigns", campaignRoutes);



app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Backend running 🚀" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ Mongo error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
