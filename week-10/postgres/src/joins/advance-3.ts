import { getClient } from "../utils";

async function getUserAndTodosWithUserDetails() {
  const client = await getClient();

  const joinQuery = `
    SELECT todos.*, users.email, users.password
    FROM todos
    JOIN users ON todos.user_id = users.id
  `;

  const response = await client.query(joinQuery);
  const results = response.rows;

  console.log("Todos with User Details : ---- ", results);
}

getUserAndTodosWithUserDetails();

/* 

    Types of Joins
        1 -> FULL JOIN - Should be present in either tables - Union
        2 -> INNER JOIN - Should be present in both tables - Intersection - by default it is the JOIN
        3 -> LEFT JOIN - Should have all entries from left table
        4 -> RIGHT JOIN - Should have all entries from right table

*/
