import { getClient } from "../utils";

// Get all the todos for a given user
// This need to ensure that every user comes atleast once.
async function getUserAndTodosWithJoin(userId: number) {
  const client = await getClient();

  const joinQuery = `
    SELECT users.*, todos.title, todos.description, todos.done
    FROM users
    LEFT JOIN todos ON users.id = todos.user_id
    WHERE users.id = $1;
  `;

  const response = await client.query(joinQuery, [userId]);
  const results = response.rows;

  console.log("User and Todos : ---- ", results);
}

getUserAndTodosWithJoin(1);

/* 

    Types of Joins
        1 -> FULL JOIN - Should be present in either tables - Union
        2 -> INNER JOIN - Should be present in both tables - Intersection - by default it is the JOIN
        3 -> LEFT JOIN - Should have all entries from left table
        4 -> RIGHT JOIN - Should have all entries from right table

*/
