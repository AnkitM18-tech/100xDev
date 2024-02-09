/* 

Why ORMs ?

1. Simpler syntax (converts objects to SQL queries under the hood)
2. Abstraction that lets you flip the database you are using. Unified API irrespective of the DB
3. Type safety/Auto completion
4. Automatic migrations
    In case of a simple Postgres app, it’s very hard to keep track of all the commands that were ran that led to the current schema of the table.


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

ALTER TABLE users
ADD COLUMN phone_number VARCHAR(15);

As your app grows, you will have a lot of these CREATE  and ALTER  commands.
ORMs (or more specifically Prisma) maintains all of these for you.
For example - https://github.com/code100x/cms/tree/main/prisma/migrations


-> Initialize an empty Node.js project
    npm init -y
-> Add dependencies
    npm install prisma typescript ts-node @types/node --save-dev
-> Initialize typescript
    npx tsc --init
    Change `rootDit` to `src`
    Change `outDir` to `dist`
-> Initialize a fresh prisma project
    npx prisma init

-> Generate Migrations
    You have created a single schema file. You haven’t yet run the CREATE TABLE  commands. To run those and create migration files , run =>
        npx prisma migrate dev --name Initialize the schema
        Your DB should now have the updated schema.

=> psql -h localhost -d postgres -U postgres

-> Generating the prisma client
    Autogenerated CLients -> We create schema.prisma file -> npx prisma migrate dev --name Initialize the schema (generates migration folder) -> the auto generated clients will convert and create the SQL queries.

    Client represents all the functions that convert -> User.create({email: "harkirat@gmail.com"}) into INSERT INTO users VALUES ...

    Once you’ve created the prisma/schema.prisma , you can generate these clients  that you can use in your Node.js app.

    How to generate the client?
        npx prisma generate - some new code that gets added at prisma/client -> depending upon our schema file. -> so we can use prisma.user / prisma.todo in our index file.
        This generates a new client  for you.

*/

/* 

Prisma let’s you define relationships  to relate tables with each other.

1. Types of relationships
    One to One
    One to Many
    Many to One
    Many to Many

    For the TODO app, there is a one to many  relationship. One User -> Multiple Todos

*/

/* 
    Todo Functions
    1. Create Todo
*/
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo(userId: number, title: string, description: string) {
  const res = await prisma.todo.create({
    data: {
      userId,
      title,
      description,
    },
  });
  console.log(res);
}

createTodo(1, "go to gym", "go to gym and do 10 pushups");

/* 
    Todo Functions
    2. Get Todo
*/
async function getTodos(userId: number) {
  const res = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(res);
}

getTodos(1);

/* 
    Todo Functions
    3. Get Todos and User Details
*/
async function getTodosAndUserDetails(userId: number) {
  // Bad Solution -> 2 Queries
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(user);
  console.log(todos);
  //   Good Solution using joins
  const todosViaJoin = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
    select: {
      user: true,
      title: true,
      description: true,
    },
  });
  console.log(todosViaJoin);
}

getTodosAndUserDetails(1);
