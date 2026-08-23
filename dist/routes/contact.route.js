import { Router } from "express";
import { ContactController } from "../controllers/contact.controller.js";
const router = Router();
router.post("/", ContactController.create);
router.get("/", ContactController.getAll);
router.get("/:id", ContactController.getById);
router.patch("/:id", ContactController.update); // সম্পূর্ণ মেসেজ ও স্ট্যাটাস আপডেটের জন্য একটিমাত্র PATCH রুট
router.delete("/:id", ContactController.remove);
export default router;
//# sourceMappingURL=contact.route.js.map