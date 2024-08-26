import {createReducer, on} from "@ngrx/store";
import {addTodoSuccess, deleteTodoSuccess, getTodosSuccess, getUsersSuccess, updateTodoSuccess} from "./actions";
import {TodoAppState} from "./state";
import {Todo} from "../../types/todo-list/todo.type";

export const initialState: TodoAppState = {
  todos: [],
  users: []
}

export const TodoAppReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state, action) => {
    return {...state, users: action.users};
  }),
  on(getTodosSuccess, (state, action) => {
    return {...state, todos: action.todos};
  }),
  on(addTodoSuccess, (state, action) => {
    let todos: Todo[] = JSON.parse(JSON.stringify(state.todos));
    todos.unshift(action.todo);
    return {...state, todos: todos};
  }),
  on(updateTodoSuccess, (state, action) => {
    let todos: Todo[] = JSON.parse(JSON.stringify(state.todos));
    return {...state, todos: todos.map(todo => todo.id == action.todo.id ? action.todo : todo)};
  }),
  on(deleteTodoSuccess, (state, action) => {
    let todos: Todo[] = JSON.parse(JSON.stringify(state.todos));
    return {...state, todos: todos.filter(todo => todo.id !== action.todo.id)};
  }),
)
