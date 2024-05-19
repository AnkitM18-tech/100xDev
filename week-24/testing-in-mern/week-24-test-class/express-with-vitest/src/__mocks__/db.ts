import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

export const prismaClient = mockDeep<PrismaClient>();

// mockDeep<PrismaClient>() - create an object and copy all the keys from that object, so we don't have to define it manually.

// export const prismaClient = {sum:{create: vi.fn()}} - if we write manually, then we need to mention every model keys like this. else we can use mockDeep<PrismaClient>() instead.

// By mocking deeply, export const prismaClient = {sum:{create: vi.fn()}} this happened automatically.
// if we didn't deep mock the client, then it would have been undefined, if we didn't manually added the keys.
