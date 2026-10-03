import { prisma } from "../config/database.js";

export const agentFormService = {
    async getAllAgents() {
        return await prisma.agent.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });
    },

    async getAgentById(id: string) {
        return await prisma.agent.findUnique({
            where: { id },
            include: { user: true },
        });
    },

    // 🔽 NEW: Name এবং Mobile Number দিয়ে Agent Verify করার মেথড
    async verifyAgentByNameAndMobile(name: string, mobileNo: string) {
        return await prisma.agent.findFirst({
            where: {
                mobileNo: mobileNo.trim(),
                name: {
                    equals: name.trim(),
                    mode: "insensitive", // Case-insensitive matching
                },
            },
            include: { user: true },
        });
    },

    // নতুন এজেন্ট তৈরি এবং ইউজারের সাথে লিঙ্ক + রোল আপডেট করার জন্য
    async createAgent(
        data: {
            name: string;
            fathersName: string;
            mobileNo: string;
            bkashNumber: string;
            presentAddress: string;
            permanentAddress: string;
            emergencyName: string;
            emergencyRelation: string;
            emergencyMobile: string;
            emergencyAddress: string;
            photo?: string;
        },
        userId?: string // Logged-in user-er ID
    ) {
        return await prisma.$transaction(async (tx) => {
            const agent = await tx.agent.create({
                data: {
                    ...data,
                    userId: userId || null,
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

    async updateAgent(id: string, data: any) {
        return await prisma.agent.update({
            where: { id },
            data,
        });
    },

    async deleteAgent(id: string) {
        return await prisma.agent.delete({
            where: { id },
        });
    },
};