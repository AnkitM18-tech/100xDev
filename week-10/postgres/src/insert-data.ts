/* 
    INSERT INTO todos (title,description, user_id,done)
    VALUES ("Buy Groceries", "Milk, Bread & Eggs", 1, FALSE);

    INSERT INTO users (username,email,password)
    VALUES ("john_doe","john.doe@example.com","hashed_password");

*/

import { getClient } from "./utils";

async function createEntries() {
  const client = await getClient();
  //   $value is used to prevent SQL Injections.
  const insertUserQueryText = `INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id`;
  //   We get the user values from frontend and store it separately to use in queries like below to prevent SQL Injections.
  const userValues = ["john.doe@example.com", "hashed_password"];

  let response = await client.query(insertUserQueryText, userValues);

  const insertTodoQueryText = `INSERT INTO todos (title, description,user_id,done) VALUES ($1,$2,$3,$4) RETURNING id`;
  const todoValues = [
    "Buy Groceries",
    "Milk, Bread & Eggs",
    response.rows[0].id,
    false,
  ];

  await client.query(insertTodoQueryText, todoValues);

  console.log("Entries Created");
}

createEntries();
