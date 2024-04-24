import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
} from "tsoa";
import { Todo } from "./todo";
import { TodoService, TodoCreationParams } from "./todoService";

@Route("todo")
export class TodoController extends Controller {
  /**
   * This is the controller for todos
   */
  @Get("{todoId}")
  public async getTodo(@Path() todoId: number): Promise<Todo> {
    return new TodoService().get(todoId);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createTodo(
    @Body() requestBody: TodoCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new TodoService().create(requestBody);
    return;
  }
}
