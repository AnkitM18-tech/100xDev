import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // we can add posts to User like below. Generally we don't want to do it like this.
  await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
      posts: {
        create: [
          {
            title: "Title 1",
          },
          {
            title: "Title 2",
          },
        ],
      },
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
