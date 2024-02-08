import { getClient } from "./utils";

async function updateTodo(todoId: number) {
  const client = await getClient();

  const updateTodoQueryText = "UPDATE todos SET done = $1 WHERE id = $2"; // can use comma and update multiple fields.
  await client.query(updateTodoQueryText, [false, todoId]);

  console.log(`Todo with ID ${todoId} updated to not done!`);
}

const todoIdToUpdate = 3;
updateTodo(todoIdToUpdate);
