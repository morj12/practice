import {TodoAppState} from "./state";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Todo} from "../../types/todo-list/todo.type";
import {User} from "../../types/todo-list/user.type";

export const baseSelect = createFeatureSelector<TodoAppState>('todoAppState');

const createGetSelector = <T>(prop: string) => createSelector(baseSelect, (store) => (store as any)[prop])

export const selectTodos = createGetSelector<Todo[]>('todos');
export const selectUsers = createGetSelector<User[]>('users');
