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
  
  trustedOrigins: [
  "https://travel-agance-hojj-umrah.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL ||
    "https://travel-agance-hojj-umrah.vercel.app",
],

advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email !== "asikk2925@gmail.com") {
            throw new Error("Registration is restricted. Only authorized accounts can sign up.");
          }
          return { data: user };
        },
      },
    },
  },
});
