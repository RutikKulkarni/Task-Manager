import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 150,
  message: "Too many requests from this IP, please try again later."
});

app.use(cors());
app.use(express.json());

app.use("/api", limiter);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
