import { PrismaClient } from "@/lib/generated/prisma";

class PrismaConnector {
  private static instance: PrismaClient;

  private constructor() { }

  public static getInstance(): PrismaClient {
    if (!PrismaConnector.instance) {
      PrismaConnector.instance = new PrismaClient();
    }
    return PrismaConnector.instance;
  }
}

export default PrismaConnector;

export const prisma = PrismaConnector.getInstance();  