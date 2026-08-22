"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path")); // পাথ মডিউল ইমপোর্ট করুন
const auth_1 = require("./utils/auth");
const node_1 = require("better-auth/node");
const slider_route_1 = __importDefault(require("./routes/slider.route"));
const news_route_1 = __importDefault(require("./routes/news.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "public/uploads")));
app.all("/api/auth/*path", (0, node_1.toNodeHandler)(auth_1.auth));
app.use("/api/sliders", slider_route_1.default);
app.use("/api/news", news_route_1.default);
exports.default = app;
