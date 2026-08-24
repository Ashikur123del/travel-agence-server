import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"; // ← সঠিক import
import { prisma } from "../config/database.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days (4 days এর বদলে)
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [
    "https://travel-agance-hojj-umrah.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL || "https://travel-agance-hojj-umrah.vercel.app",
  ],

  // Production-এ secure cookie ঠিক আছে
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false, // একই domain হলে false রাখো
    },
  },


  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email !== "asikk2925@gmail.com") {
            throw new Error(
              "Registration is restricted. Only authorized accounts can sign up."
            );
          }
          return { data: user };
        },
      },
    },
  },
});