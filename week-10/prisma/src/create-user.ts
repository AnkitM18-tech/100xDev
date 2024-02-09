import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // .. Prisma client queries here
  await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
    },
  });
}

main()
  .then(async () => {
    console.log("Done with the query!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
