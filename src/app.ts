import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; // পাথ মডিউল ইমপোর্ট করুন

import { toNodeHandler } from "better-auth/node";
import sliderRoutes from "./routes/slider.route.js";
import newsRoutes from './routes/news.route.js'
import { auth } from "./utils/auth.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // আপনার ফ্রন্টএন্ড পোর্ট
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ফর্মের অন্যান্য ডেটা রিড করার জন্য এটি জরুরি

// স্ট্যাটিক ফোল্ডার পাথ সেটআপ (যাতে লোকাল ফোল্ডারের ছবি ব্রাউজার থেকে দেখতে পাওয়া যায়)
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.all("/api/auth/*path", toNodeHandler(auth));
app.use("/api/sliders", sliderRoutes);
app.use("/api/news", newsRoutes);

export default app;
