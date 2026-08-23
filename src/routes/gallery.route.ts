import { Router } from "express";
import { GalleryController } from "../controllers/gallery.controller.js";
import { upload } from "../middlewares/upload.middleware.js"; // আপলোড মিডলওয়্যার ইম্পোর্ট করা হলো

const router = Router();

router.post("/", upload.single("image"), GalleryController.create);
router.get("/", GalleryController.getAll);
router.get("/:id", GalleryController.getById);
router.put("/:id", upload.single("image"), GalleryController.update);
router.delete("/:id", GalleryController.remove);

export const galleryRoutes = router;