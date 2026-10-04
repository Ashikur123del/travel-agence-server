import { prisma } from "../config/database.js";
export const agentFormService = {
    async getAllAgents() {
        return await prisma.agent.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });
    },
    async getAgentById(id) {
        return await prisma.agent.findUnique({
            where: { id },
            include: { user: true },
        });
    },
    async verifyAgentByMobile(mobileNo) {
        return await prisma.agent.findFirst({
            where: {
                mobileNo: mobileNo.trim(),
            },
            include: { user: true },
        });
    },
    async createAgent(data, userId) {
        return await prisma.$transaction(async (tx) => {
            const agent = await tx.agent.create({
                data: {
                    name: data.name,
                    fathersName: data.fathersName,
                    mobileNo: data.mobileNo,
                    whatsAppNumber: data.whatsAppNumber || undefined,
                    bkashNumber: data.bkashNumber ?? "",
                    bankAccountNumber: data.bankAccountNumber || undefined,
                    presentAddress: data.presentAddress,
                    permanentAddress: data.permanentAddress,
                    emergencyName: data.emergencyName,
                    emergencyRelation: data.emergencyRelation,
                    emergencyMobile: data.emergencyMobile,
                    emergencyAddress: data.emergencyAddress,
                    photo: data.photo || undefined,
                    userId: userId || undefined,
                },
            });
            if (userId) {
                await tx.user.update({
                    where: { id: userId },
                    data: { role: "agent" },
                });
            }
            return agent;
        });
    },
    async updateAgent(id, data) {
        return await prisma.agent.update({
            where: { id },
            data,
        });
    },
    async deleteAgent(id) {
        return await prisma.agent.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=agentform.service.js.map