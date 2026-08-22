"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
// ক্লাউডিনারি কনফিগারেশন
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// ক্লাউডিনারি স্টোরেজ সেটআপ
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        return {
            folder: "hero-sliders", // ক্লাউডিনারিতে যে ফোল্ডারে ছবি জমা হবে
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: Date.now() + "-" + file.originalname.split(".")[0],
        };
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
