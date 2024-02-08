// JOINS

import { getClient } from "../utils";

// Get me the email of the user and all their todos -- easy way without joins

async function getUserAndTodosSeparateQueries(userId: number) {
  const client = await getClient();

  //   fetch user details
  const userQueryText = "SELECT * FROM users WHERE id = $1";
  const userQueryResponse = await client.query(userQueryText, [userId]);
  const user = userQueryResponse.rows[0];

  //   fetch todos for the user
  const todosQueryText = "SELECT * FROM todos WHERE user_id = $1";
  const todosResponse = await client.query(todosQueryText, [userId]);
  const todos = todosResponse.rows;

  console.log("User Details : ---- ", user);
  console.log("Todos : ---- ", todos);
}

getUserAndTodosSeparateQueries(1);

// The above function will do two db queries, while using joins we can make the queries faster. -- or we can make all queries in a single db call.
