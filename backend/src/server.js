import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import {protectedRoute} from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/auth", authRoute);

app.use(protectedRoute);
app.use("/api/user", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
