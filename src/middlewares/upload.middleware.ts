import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// ক্লাউডিনারি কনফিগারেশন
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ক্লাউডিনারি স্টোরেজ সেটআপ
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "hero-sliders", // ক্লাউডিনারিতে যে ফোল্ডারে ছবি জমা হবে
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

export const upload = multer({ storage: storage });