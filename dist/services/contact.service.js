import { prisma } from "../config/database.js";
export const ContactService = {
    async createContact(data) {
        return await prisma.contactMessage.create({ data });
    },
    async getAllContacts() {
        return await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
    async getContactById(id) {
        return await prisma.contactMessage.findUnique({
            where: { id },
        });
    },
    async updateContactStatus(id, isRead) {
        return await prisma.contactMessage.update({
            where: { id },
            data: { isRead },
        });
    },
    // নতুন যোগ করা হয়েছে: সম্পূর্ণ মেসেজ বা কন্টাক্ট এডিট করার জন্য
    async updateContact(id, data) {
        return await prisma.contactMessage.update({
            where: { id },
            data,
        });
    },
    async deleteContact(id) {
        return await prisma.contactMessage.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=contact.service.js.map