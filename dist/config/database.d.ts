import "dotenv/config";
import { PrismaClient } from "../generated/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
export declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../generated/runtime/client.js").DefaultArgs>;
