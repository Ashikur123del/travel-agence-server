import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; // পাথ মডিউল ইমপোর্ট করুন
import { auth } from "./utils/auth";
import { toNodeHandler } from "better-auth/node";
import sliderRoutes from "./routes/slider.route";
import newsRoutes from './routes/news.route';
const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.all("/api/auth/*path", toNodeHandler(auth));
app.use("/api/sliders", sliderRoutes);
app.use("/api/news", newsRoutes);
export default app;
