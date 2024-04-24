"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    get(todoId) {
        return {
            id: todoId,
            title: "Very First Todo",
            description: "This is the very first todo",
            done: false,
        };
    }
    create(todoCreationParams) {
        return Object.assign(Object.assign({ id: Math.floor(Math.random() * 10000) }, todoCreationParams), { done: false });
    }
}
exports.TodoService = TodoService;
// We shall write all our database fetching and creating etc logic in this service file. For now This is only Mock Data we are using.
