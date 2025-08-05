import { PrismaClient } from "@/lib/generated/prisma";

const prisma: PrismaClient = global.prisma || new PrismaClient();

declare global {
  var prisma: PrismaClient;
}

global.prisma = prisma;

export { prisma };