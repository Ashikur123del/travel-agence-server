"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controllers/news.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.get("/", news_controller_1.newsController.getNews);
router.get("/:id", news_controller_1.newsController.getSingleNews);
router.post("/", upload_middleware_1.upload.single("image"), news_controller_1.newsController.createNews);
router.patch("/:id", upload_middleware_1.upload.single("image"), news_controller_1.newsController.updateNews);
router.delete("/:id", news_controller_1.newsController.deleteNews);
exports.default = router;
//# sourceMappingURL=news.route.js.map