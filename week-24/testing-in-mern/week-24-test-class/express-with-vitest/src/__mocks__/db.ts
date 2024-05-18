import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

export const prismaClient = mockDeep<PrismaClient>();

// mockDeep<PrismaClient>() - create an object and copy all the keys from that object, so we don't have to define it manually.
