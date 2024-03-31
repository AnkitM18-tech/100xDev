import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const response = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });
  console.log(response);
}

// insertUser("admin", "admin", "Super", "User");

async function getTodos(userId: number) {
  const todos = await prisma.todos.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(todos);
}

// getTodos(1);

// making two separate queries is a bad solution -> increase in latency. we can use the defined relation to fetch the data in a single query.

async function getTodosAndUserDetails(userId: number) {
  const todos = await prisma.todos.findMany({
    where: {
      userId: userId,
    },
    select: {
      user: true, // getting the user
      title: true,
      description: true,
    },
  });
  console.log(todos);
}

getTodosAndUserDetails(1);

// also when we create a todo with invalid userId, it will throw error. -> relationship ensures any orphan value occurance in dbs.
