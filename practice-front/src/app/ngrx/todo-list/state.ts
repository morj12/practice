import {Todo} from "../../types/todo-list/todo.type";
import {User} from "../../types/todo-list/user.type";

export interface TodoAppState {
  todos: Todo[];
  users: User[];
}
