"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slider_controller_1 = require("../controllers/slider.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.get("/", slider_controller_1.sliderController.getSliders);
router.get("/:id", slider_controller_1.sliderController.getSliderById); // নির্দিষ্ট স্লাইড দেখার জন্য
router.post("/", upload_middleware_1.upload.single("image"), slider_controller_1.sliderController.createSlider);
router.put("/:id", upload_middleware_1.upload.single("image"), slider_controller_1.sliderController.updateSlider); // স্লাইড এডিট বা আপডেট করার জন্য
router.delete("/:id", slider_controller_1.sliderController.deleteSlider); // স্লাইড ডিলিট করার জন্য
exports.default = router;
//# sourceMappingURL=slider.route.js.map