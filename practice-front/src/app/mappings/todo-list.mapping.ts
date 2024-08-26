import {TodoModel} from "../services/todo-api/models/todo.model";
import {Todo} from "../types/todo-list/todo.type";
import {UserModel} from "../services/todo-api/models/user.model";
import {User} from "../types/todo-list/user.type";

export class TodoListMapping {

  static MapTodosToType(todos: TodoModel[]): Todo[] {
    return todos?.map(this.MapTodoToType) ?? [];
  }

  static MapTodoToType(todo: TodoModel): Todo {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId,
    }
  }

  static MapUsersToType(users: UserModel[]): User[] {
    return users?.map(this.MapUserToType) ?? [];
  }

  private static MapUserToType(user: UserModel): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}
