import { prisma } from "../config/database.js"; // আপনার প্রজেক্টের সঠিক পাথ দিন

export const GalleryService = {
 
  async createGallery(data: { title: string; category?: string; imageUrl: string }) {
    return await prisma.gallery.create({ data });
  },

 
  async getAllGalleries() {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  // Get Single by ID
  async getGalleryById(id: string) {
    return await prisma.gallery.findUnique({
      where: { id },
    });
  },

  // Update
  async updateGallery(id: string, data: { title?: string; category?: string; imageUrl?: string }) {
    return await prisma.gallery.update({
      where: { id },
      data,
    });
  },

  // Delete
  async deleteGallery(id: string) {
    return await prisma.gallery.delete({
      where: { id },
    });
  },
};