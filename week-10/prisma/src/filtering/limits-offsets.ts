import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info", "query"],
});

async function main() {
  let res = await prisma.post.findMany({
    take: 3, // LIMIT
    // skip: 10 -> skips 10 posts, then select 3 -> OFFSET
  });
  console.log(res);
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

/* 
    SQL Equivalent ->

    SELECT * FROM users OFFSET 0 LIMIT 10;
    From User 0 to 10. if OFFSET 2 then 2 - 12 => 10 Users.

    Pagination is being implemented like this.
    SELECT * FROM users OFFSET 0 LIMIT 10; - first set of 10 users
    SELECT * FROM users OFFSET 10 LIMIT 10; - second set of 10 users
    SELECT * FROM users OFFSET 20 LIMIT 10; - third set of 10 users

*/
