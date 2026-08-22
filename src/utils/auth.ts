import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "../config/database.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 4, 
    updateAge: 60 * 60 * 24,    
  },
  advanced: {
    disableOriginCheck: process.env.NODE_ENV !== "production",
  },
  // নির্দিষ্ট ইউজার ছাড়া অন্যদের রেজিস্ট্রেশন ব্লক করার জন্য এই হুকটি যোগ করা হয়েছে
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email !== "nirob123@gmail.com") {
            throw new Error("Registration is restricted. Only authorized accounts can sign up.");
          }
          return { data: user };
        },
      },
    },
  },
});
