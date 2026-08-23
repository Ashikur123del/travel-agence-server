import { Router } from "express";
import { ContactController } from "../controllers/contact.controller.js"; // আপনার পাথ অনুযায়ী ঠিক করে নিবেন
const router = Router();
// ১. নতুন মেসেজ পাঠানো এবং সব মেসেজ ফেচ করা
router.post("/", ContactController.create);
router.get("/", ContactController.getAll);
// ২. নির্দিষ্ট মেসেজ দেখা এবং ডিলিট করা
router.get("/:id", ContactController.getById);
router.delete("/:id", ContactController.remove);
// ৩. স্ট্যাটাস আপডেট (Read/Unread)
router.patch("/:id/status", ContactController.updateStatus); // অথবা আপনার আগের নিয়ম অনুযায়ী
// ৪. সম্পূর্ণ মেসেজ এডিট বা আপডেট করা (PATCH মেথড)
router.patch("/:id", ContactController.update);
export default router;
//# sourceMappingURL=news.route.js.map