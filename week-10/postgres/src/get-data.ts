/* 
    SELECT * FROM todos WHERE user_id = desired_user_id

*/

import { getClient } from "./utils";

async function getUsers() {
  const client = await getClient();

  const selectUsersQueryText = `SELECT * FROM users`;
  const userResponse = await client.query(selectUsersQueryText);

  console.log("Users: ");
  for (let user of userResponse.rows) {
    console.log(`ID: ${user.id}, Email: ${user.email}`);
  }
}

async function getUserFromEmail(email: string) {
  const client = await getClient();
  const selectUserQueryText = `SELECT * FROM users WHERE email = $1`;
  const userResponse = await client.query(selectUserQueryText, [email]);

  console.log("Selected user: ");
  for (let user of userResponse.rows) {
    console.log(`ID: ${user.id}, Email: ${user.email}`);
  }
}

async function getTodosForUser(userId: number) {
  const client = await getClient();

  const selectTodosText = `SELECT * FROM todos WHERE user_id = $1`;
  const todoResponse = await client.query(selectTodosText, [userId]);

  console.log(`Todos for User ID ${userId}: `);
  for (let todo of todoResponse.rows) {
    console.log(
      `ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`
    );
  }
}

getUsers();

getUserFromEmail("john.doe@example.com");

getTodosForUser(1);
