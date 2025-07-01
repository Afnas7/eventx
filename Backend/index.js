import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import eventRoute from "./route/event.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(URI, {
    useNewUrlParser: true, // ✅ still needed
    // ⛔ no need for useUnifiedTopology anymore
  })
  .then(() => console.log("✅ Connected to mongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Route handlers
app.use("/event", eventRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
