/// https://github.com/prisma/prisma/issues/5026

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

async function main() {
  const users = await prisma.user.findMany({
    take: 2,
  });
}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

prisma.$on("query", async (e) => {
  console.log(`${e.query} ${e.params}`);
});

// If we want to look into the values that are being sent with the SQL queries to debug we can use this approach. because log: ["info","query"] won't show you the $1, $2 arguments.
