// write a function to create a users table in your database.
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:mysecretpassword@localhost:5432/postgres",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users2 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

async function insertUserData(
  username: string,
  email: string,
  password: string
) {
  await client.connect();
  // SQL Injections can happen, bad practice - we are taking values entered by user and putting it in the query - it can be other SQL queries and they can fabricate the query and attack the db.
  const result2 = await client.query(`
    INSERT INTO users (username, email, password)
    VALUES ('${username}','${email}','${password}')
  `);
  // Good Practice - if query sent still will be passed as string
  const result = await client.query(
    `
    INSERT INTO users (username, email, password)
    VALUES ($1,$2,$3)
  `,
    [username, email, password]
  );
  console.log(result);
}

// createUsersTable();
// insertUserData(
//   "another_user",
//   "another_user@email.com",
//   "another_user_password"
// );

// ON DELETE CASCADE - if the user is deleted then it will also delete the respective addresses.
// ON DELETE RESTRICT - if we try to delete the user, it will throw error. then in order to delete the user, first we have to delete the addresses first explicitly.
