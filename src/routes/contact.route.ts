import { Router } from "express";
import { ContactController } from "../controllers/contact.controller.js";

const router = Router();

router.post("/", ContactController.create);
router.get("/", ContactController.getAll);
router.get("/:id", ContactController.getById);
router.patch("/:id/status", ContactController.updateStatus); // বা আপনার স্ট্যাটাস আপডেটের রাউট
router.patch("/:id", ContactController.update); // সম্পূর্ণ এডিট বা আপডেটের জন্য
router.delete("/:id", ContactController.remove);

export default router;