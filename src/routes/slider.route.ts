import { Router } from "express";
import { sliderController } from "../controllers/slider.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", sliderController.getSliders);
router.get("/:id", sliderController.getSliderById);                  // নির্দিষ্ট স্লাইড দেখার জন্য
router.post("/", upload.single("image"), sliderController.createSlider);
router.put("/:id", upload.single("image"), sliderController.updateSlider); // স্লাইড এডিট বা আপডেট করার জন্য
router.delete("/:id", sliderController.deleteSlider);                 // স্লাইড ডিলিট করার জন্য

export default router;
