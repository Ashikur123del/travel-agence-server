import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/index.js";
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
export const sliderService = {
    async getAllSliders() {
        return await prisma.heroSlider.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
    // নতুন: নির্দিষ্ট স্লাইডের ডিটেইলস পাওয়ার জন্য
    async getSliderById(id) {
        return await prisma.heroSlider.findUnique({
            where: { id },
        });
    },
    async createSlider(data) {
        return await prisma.heroSlider.create({
            data: {
                image: data.image,
                alt: data.alt || "Slide image",
                firstText: data.firstText,
                highlightText: data.highlightText,
                secondText: data.secondText,
                description: data.description,
            },
        });
    },
    // নতুন: স্লাইড আপডেট বা এডিট করার জন্য
    async updateSlider(id, data) {
        return await prisma.heroSlider.update({
            where: { id },
            data,
        });
    },
    // নতুন: স্লাইড ডিলিট করার জন্য
    async deleteSlider(id) {
        return await prisma.heroSlider.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=slider.service.js.map