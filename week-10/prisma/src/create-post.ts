import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// {log: ["info","query"]} => if we pass this inside PrismaClient, then we would be able to see underlying SQL logs and queries too on console.

async function main() {
  await prisma.post.create({
    data: {
      title: "Title Of Post",
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });
}
// authorId : 1 => this will also work

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
