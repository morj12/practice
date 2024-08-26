import {createAction, props} from "@ngrx/store";
import {Todo} from "../../types/todo-list/todo.type";
import {User} from "../../types/todo-list/user.type";

export const getUsers = createAction('[USER] Get Users');
export const getUsersSuccess = createAction('[USER] Get Users Success', props<{ users: User[] }>());
export const getUsersFailure = createAction('[USER] Get Users Failure', props<{ error: string }>());

export const getTodos = createAction('[TODO] Get Todos', props<{ userId: number }>());
export const getTodosSuccess = createAction('[TODO] Get Todos Success', props<{ todos: Todo[] }>());
export const getTodosFailure = createAction('[TODO] Get Todos Failure', props<{ error: string }>());

export const addTodo = createAction('[TODO] Add Todo', props<{ todo: Todo }>());
export const addTodoSuccess = createAction('[TODO] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[TODO] Add Todo Failure', props<{ error: string }>());

export const updateTodo = createAction('[TODO] Update Todo', props<{ todo: Todo }>());
export const updateTodoSuccess = createAction('[TODO] Update Todo Success', props<{ todo: Todo }>());
export const updateTodoFailure = createAction('[TODO] Update Todo Failure', props<{ error: string }>());

export const deleteTodo = createAction('[TODO] Delete Todo', props<{ todo: Todo }>());
export const deleteTodoSuccess = createAction('[TODO] Delete Todo Success', props<{ todo: Todo }>());
export const deleteTodoFailure = createAction('[TODO] Delete Todo Failure', props<{ error: string }>());

export const showSuccessNotification = createAction('[NOTIFICATION] Send Notification', props<{ message: string }>());
export const showErrorNotification = createAction('[NOTIFICATION] Send Notification', props<{ message: string }>());
