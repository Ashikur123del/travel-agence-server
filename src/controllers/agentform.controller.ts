import { Request, Response } from "express";
import { agentFormService } from "../services/agentform.service.js";

interface MulterRequest extends Request {
    file?: Express.Multer.File & { path: string };
}

const getRouteParamId = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }
    return value ?? "";
};

export const agentFormController = {
    // GET: All Agents
    async getAgents(req: Request, res: Response) {
        try {
            const agents = await agentFormService.getAllAgents();
            return res.status(200).json(agents);
        } catch (error) {
            console.error("Error fetching agents:", error);
            return res.status(500).json({ error: "Failed to fetch agents" });
        }
    },

    // GET: Single Agent by ID
    async getAgentById(req: Request, res: Response) {
        try {
            const id = getRouteParamId(req.params.id);
            const agent = await agentFormService.getAgentById(id);

            if (!agent) {
                return res.status(404).json({ error: "Agent not found" });
            }

            return res.status(200).json(agent);
        } catch (error) {
            console.error("Error fetching agent details:", error);
            return res.status(500).json({ error: "Failed to fetch agent details" });
        }
    },

    // 🔽 NEW: POST: Verify Agent by Name & Mobile No
    async verifyAgent(req: Request, res: Response) {
        try {
            const { name, mobileNo } = req.body;

            if (!name || !mobileNo) {
                return res.status(400).json({
                    error: "Both Name and Mobile Number are required for verification",
                });
            }

            const agent = await agentFormService.verifyAgentByNameAndMobile(name, mobileNo);

            if (!agent) {
                return res.status(404).json({
                    error: "No agent profile found matching this Name and Mobile number",
                });
            }

            return res.status(200).json({
                message: "Agent verified successfully",
                agent,
            });
        } catch (error: any) {
            console.error("Error verifying agent:", error);
            return res.status(500).json({ error: error?.message || "Verification failed" });
        }
    },

    // POST: Create Agent
    async createAgent(req: MulterRequest, res: Response) {
        try {
            const photoPath = req.file ? req.file.path : null;

            const {
                name,
                fathersName,
                mobileNo,
                bkashNumber,
                presentAddress,
                permanentAddress,
                emergencyName,
                emergencyRelation,
                emergencyMobile,
                emergencyAddress,
            } = req.body;

            const requiredFields: Record<string, any> = {
                name,
                fathersName,
                mobileNo,
                bkashNumber,
                presentAddress,
                permanentAddress,
                emergencyName,
                emergencyRelation,
                emergencyMobile,
                emergencyAddress,
            };

            const missingFields = Object.keys(requiredFields).filter(
                (key) => !requiredFields[key] || requiredFields[key].toString().trim() === ""
            );

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
                bkashNumber,
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
        } catch (error: any) {
            console.error("Error creating agent:", error);
            return res
                .status(500)
                .json({ error: error?.message || "Failed to create agent" });
        }
    },

    // PATCH: Update Agent Data
    async updateAgent(req: MulterRequest, res: Response) {
        try {
            const id = getRouteParamId(req.params.id);
            const photoPath = req.file ? req.file.path : req.body.photo;

            const updateData: Record<string, any> = {};

            if (photoPath) updateData.photo = photoPath;
            if (req.body.name) updateData.name = req.body.name;
            if (req.body.fathersName) updateData.fathersName = req.body.fathersName;
            if (req.body.mobileNo) updateData.mobileNo = req.body.mobileNo;
            if (req.body.bkashNumber) updateData.bkashNumber = req.body.bkashNumber;
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
        } catch (error: any) {
            console.error("Error updating agent:", error?.message || error);
            return res
                .status(500)
                .json({ error: error?.message || "Failed to update agent" });
        }
    },

    // DELETE: Delete Agent
    async deleteAgent(req: Request, res: Response) {
        try {
            const id = getRouteParamId(req.params.id);

            await agentFormService.deleteAgent(id);

            return res.status(200).json({ message: "Agent deleted successfully" });
        } catch (error) {
            console.error("Error deleting agent:", error);
            return res.status(500).json({ error: "Failed to delete agent" });
        }
    },
};