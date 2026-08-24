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
    // auth.ts (back-end)
    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production",
        // কুকি যেন ফ্রন্টএন্ড ডোমেইন থেকে এক্সেস করা যায় তার জন্য কুকি অপশন সেট করা
        cookies: {
            sessionToken: {
                name: "better-auth.session_token",
                options: {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    path: "/",
                    // আপনার ব্যাকএন্ড এবং ফ্রন্টএন্ড আলাদা হওয়ায় ডোমেইন প্রপারলি হ্যান্ডেল করতে হবে
                },
            },
        },
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
//# sourceMappingURL=auth.js.map