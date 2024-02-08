/* 

    DELETE FROM todos WHERE id = specific_todo_id;

*/

import { getClient } from "./utils";

async function deleteTodo(todoId: number) {
  const client = await getClient();

  const deleteTodoQueryText = "DELETE FROM todos WHERE id = $1";
  await client.query(deleteTodoQueryText, [todoId]);

  console.log(`Todo with ID ${todoId} deleted!`);
}

const deleteTodoId = 1;
deleteTodo(deleteTodoId);

// Generally we don't delete data in prod, we create another column "Deleted" and set it to true or false.

// DROP TABLE IF EXISTS todos; -- delete table if exists
