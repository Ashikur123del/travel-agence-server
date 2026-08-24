import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import sliderRoutes from "./routes/slider.route.js";
import newsRoutes from "./routes/news.route.js";
import { galleryRoutes } from "./routes/gallery.route.js";
import contactRoutes from "./routes/contact.route.js";
const app = express();
// CORS
app.use(cors({
    origin: [
        "https://travel-agance-hojj-umrah.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
    ],
}));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(morgan("dev"));
// Auth route — named wildcard (Express 5 / path-to-regexp এর জন্য)
app.all("/api/auth/*path", toNodeHandler(auth));
// JSON parser (auth এর পরে)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
// Other routes
app.use("/api/sliders", sliderRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contacts", contactRoutes);
export default app;
//# sourceMappingURL=app.js.map