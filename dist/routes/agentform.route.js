import { Router } from "express";
import { agentFormController } from "../controllers/agentform.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = Router();
// GET all agents
router.get("/", agentFormController.getAgents);
// 🔽 NEW: POST verify agent by name and mobile number
router.post("/verify", agentFormController.verifyAgent);
// GET single agent by ID
router.get("/:id", agentFormController.getAgentById);
// POST create agent (Image upload with field name 'photo')
router.post("/", upload.single("photo"), agentFormController.createAgent);
// PATCH update agent details/photo
router.patch("/:id", upload.single("photo"), agentFormController.updateAgent);
// DELETE agent by ID
router.delete("/:id", agentFormController.deleteAgent);
export default router;
//# sourceMappingURL=agentform.route.js.map