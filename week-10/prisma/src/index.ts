import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      firstName,
      lastName,
    },
    select: {
      // what fields will be included in res
      id: true,
      password: true,
    },
  });
  console.log(res);
}

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { email: username },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}

async function getUser(username: string) {
  const res = await prisma.user.findFirst({
    where: { email: username },
  });
  console.log(res);
}

// insertUser("johndoe@gmail.com", "johnkidoe", "John", "Doe");
// updateUser("johndoe@gmail.com", { firstName: "Johny", lastName: "MistyDoe" });
getUser("johndoe@gmail.com");

/* 

  Prisma -> Automated Migrations -> DB changes often, you add more columns, add new tables, you have to do MIGRATIONS to keep syncing the DB state.

  Pre ORM days -> Manually Update the prod DB, dev DB

  There were no logs of the changes made to the DB.

*/
