import { agentFormService } from "../services/agentform.service.js";
const getRouteParamId = (value) => {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }
    return value ?? "";
};
export const agentFormController = {
    async getAgents(req, res) {
        try {
            const agents = await agentFormService.getAllAgents();
            return res.status(200).json(agents);
        }
        catch (error) {
            console.error("Error fetching agents:", error);
            return res.status(500).json({ error: "Failed to fetch agents" });
        }
    },
    async getAgentById(req, res) {
        try {
            const id = getRouteParamId(req.params.id);
            const agent = await agentFormService.getAgentById(id);
            if (!agent) {
                return res.status(404).json({ error: "Agent not found" });
            }
            return res.status(200).json(agent);
        }
        catch (error) {
            console.error("Error fetching agent details:", error);
            return res.status(500).json({ error: "Failed to fetch agent details" });
        }
    },
    async verifyAgent(req, res) {
        try {
            const { mobileNo } = req.body;
            if (!mobileNo) {
                return res.status(400).json({
                    error: "Mobile Number is required",
                });
            }
            const agent = await agentFormService.verifyAgentByMobile(mobileNo);
            if (!agent) {
                return res.status(404).json({
                    error: "No agent profile found matching this Mobile Number",
                });
            }
            return res.status(200).json({
                message: "Agent verified successfully",
                agent,
            });
        }
        catch (error) {
            console.error("Error verifying agent:", error);
            return res.status(500).json({ error: error?.message || "Verification failed" });
        }
    },
    async createAgent(req, res) {
        try {
            const photoPath = req.file ? req.file.path : null;
            const { name, fathersName, mobileNo, whatsAppNumber, // 🟢 যুক্ত করা হয়েছে
            bkashNumber, bankAccountNumber, // 🟢 যুক্ত করা হয়েছে
            presentAddress, permanentAddress, emergencyName, emergencyRelation, emergencyMobile, emergencyAddress, } = req.body;
            // ⚠️ bkashNumber বা bankAccountNumber কে আবশ্যক (Required) ধরা হয়নি কারণ এগুলো ডায়নামিক
            const requiredFields = {
                name,
                fathersName,
                mobileNo,
                presentAddress,
                permanentAddress,
                emergencyName,
                emergencyRelation,
                emergencyMobile,
                emergencyAddress,
            };
            const missingFields = Object.keys(requiredFields).filter((key) => !requiredFields[key] || requiredFields[key].toString().trim() === "");
            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: "Missing required fields for agent registration",
                    missingFields,
                });
            }
            const newAgent = await agentFormService.createAgent({
                name,
                fathersName,
                mobileNo,
                whatsAppNumber: whatsAppNumber || undefined, // 🟢 optional
                bkashNumber: bkashNumber || undefined, // 🟢 optional
                bankAccountNumber: bankAccountNumber || undefined, // 🟢 optional
                presentAddress,
                permanentAddress,
                emergencyName,
                emergencyRelation,
                emergencyMobile,
                emergencyAddress,
                photo: photoPath || undefined,
            });
            return res
                .status(201)
                .json({ message: "Agent registered successfully", newAgent });
        }
        catch (error) {
            console.error("Error creating agent:", error);
            return res
                .status(500)
                .json({ error: error?.message || "Failed to create agent" });
        }
    },
    // PATCH: Update Agent Data
    async updateAgent(req, res) {
        try {
            const id = getRouteParamId(req.params.id);
            const photoPath = req.file ? req.file.path : req.body.photo;
            const updateData = {};
            if (photoPath)
                updateData.photo = photoPath;
            if (req.body.name)
                updateData.name = req.body.name;
            if (req.body.fathersName)
                updateData.fathersName = req.body.fathersName;
            if (req.body.mobileNo)
                updateData.mobileNo = req.body.mobileNo;
            if (req.body.whatsAppNumber !== undefined)
                updateData.whatsAppNumber = req.body.whatsAppNumber; // 🟢
            if (req.body.bkashNumber !== undefined)
                updateData.bkashNumber = req.body.bkashNumber; // 🟢
            if (req.body.bankAccountNumber !== undefined)
                updateData.bankAccountNumber = req.body.bankAccountNumber; // 🟢
            if (req.body.presentAddress)
                updateData.presentAddress = req.body.presentAddress;
            if (req.body.permanentAddress)
                updateData.permanentAddress = req.body.permanentAddress;
            if (req.body.emergencyName)
                updateData.emergencyName = req.body.emergencyName;
            if (req.body.emergencyRelation)
                updateData.emergencyRelation = req.body.emergencyRelation;
            if (req.body.emergencyMobile)
                updateData.emergencyMobile = req.body.emergencyMobile;
            if (req.body.emergencyAddress)
                updateData.emergencyAddress = req.body.emergencyAddress;
            const updatedAgent = await agentFormService.updateAgent(id, updateData);
            return res
                .status(200)
                .json({ message: "Agent updated successfully", updatedAgent });
        }
        catch (error) {
            console.error("Error updating agent:", error?.message || error);
            return res
                .status(500)
                .json({ error: error?.message || "Failed to update agent" });
        }
    },
    // DELETE: Delete Agent
    async deleteAgent(req, res) {
        try {
            const id = getRouteParamId(req.params.id);
            await agentFormService.deleteAgent(id);
            return res.status(200).json({ message: "Agent deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting agent:", error);
            return res.status(500).json({ error: "Failed to delete agent" });
        }
    },
};
//# sourceMappingURL=agentform.controller.js.map