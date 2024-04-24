import { Todo } from "./todo";

export type TodoCreationParams = Pick<Todo, "title" | "description">;

export class TodoService {
  public get(todoId: number): Todo {
    return {
      id: todoId,
      title: "Very First Todo",
      description: "This is the very first todo",
      done: false,
    };
  }

  public create(todoCreationParams: TodoCreationParams): Todo {
    return {
      id: Math.floor(Math.random() * 10000),
      ...todoCreationParams,
      done: false,
    };
  }
}

// We shall write all our database fetching and creating etc logic in this service file. For now This is only Mock Data we are using.
