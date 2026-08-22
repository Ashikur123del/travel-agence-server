"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_adapter_1 = require("@better-auth/prisma-adapter");
const generated_1 = require("../generated");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new generated_1.PrismaClient({ adapter });
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_adapter_1.prismaAdapter)(prisma, {
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
