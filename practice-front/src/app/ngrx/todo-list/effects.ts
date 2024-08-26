import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {
  addTodo, addTodoFailure, addTodoSuccess,
  deleteTodo, deleteTodoFailure, deleteTodoSuccess,
  getTodos, getTodosFailure,
  getTodosSuccess,
  getUsers, getUsersFailure,
  getUsersSuccess,
  showErrorNotification,
  showSuccessNotification,
  updateTodo, updateTodoFailure,
  updateTodoSuccess
} from "./actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {SnackbarService} from "../../services/snackbar/snackbar.service";
import {TodoApiService} from "../../services/todo-api/todo-api.service";
import {TodoModel} from "../../services/todo-api/models/todo.model";
import {UserModel} from "../../services/todo-api/models/user.model";
import {TodoListMapping} from "../../mappings/todo-list.mapping";

@Injectable()
export class TodoAppEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private snackbarService: SnackbarService,
              private todoApiService: TodoApiService) {
  }

  //#region effects

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.todoApiService.getUsers().pipe(
          map((response: UserModel[]) => getUsersSuccess({users: TodoListMapping.MapUsersToType(response)})),
          catchError(error => of(getUsersFailure({error: error.message})))
        )
      )
    );
  })

  getTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTodos),
      mergeMap((action) =>
        this.todoApiService.getUserTodos(action.userId).pipe(
          map((response: TodoModel[]) => getTodosSuccess({todos: TodoListMapping.MapTodosToType(response)})),
          catchError(error => of(getTodosFailure({error: error.message})))
        )
      )
    );
  })

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTodo),
      mergeMap((action) =>
        this.todoApiService.addTodo(action.todo).pipe(
          map((response: TodoModel) => addTodoSuccess({todo: TodoListMapping.MapTodoToType(response)})),
          catchError(error => of(addTodoFailure({error: error.message})))
        )
      )
    );
  })

  updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTodo),
      mergeMap((action) =>
        this.todoApiService.updateTodo(action.todo).pipe(
          map((response: TodoModel) => updateTodoSuccess({todo: TodoListMapping.MapTodoToType(response)})),
          catchError(error => of(updateTodoFailure({error: error.message})))
        )
      )
    );
  })

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap((action) =>
        this.todoApiService.deleteTodo(action.todo.id).pipe(
          map(() => deleteTodoSuccess({todo: action.todo})),
          catchError(error => of(deleteTodoFailure({error: error.message})))
        )
      )
    );
  })

  //#endregion effects

  //#region notifications

  addTodoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(addTodoSuccess),
    map(() => showSuccessNotification({message: 'Item added successfully'}))
  ));

  addTodoFailure$ = createEffect(() => this.actions$.pipe(
    ofType(addTodoFailure),
    map(action => showErrorNotification({message: `Error on adding item: ${action.error}`}))
  ));

  updateTodoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(updateTodoSuccess),
    map(() => showSuccessNotification({message: 'Item updated successfully'}))
  ));

  updateTodoFailure$ = createEffect(() => this.actions$.pipe(
    ofType(updateTodoFailure),
    map(action => showErrorNotification({message: `Error on updating item: ${action.error}`}))
  ));

  deleteTodoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTodoSuccess),
    map(() => showSuccessNotification({message: 'Item deleted successfully'}))
  ));

  deleteTodoFailure$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTodoFailure),
    map(action => showErrorNotification({message: `Error on deleting item: ${action.error}`}))
  ));

  showSuccessNotification$ = createEffect(() => this.actions$.pipe(
    ofType(showSuccessNotification),
    tap(action => {
      this.snackbarService.showSuccess(action.message);
    })
  ), {dispatch: false});

  showErrorNotification$ = createEffect(() => this.actions$.pipe(
    ofType(showErrorNotification),
    tap(action => {
      this.snackbarService.showError(action.message);
    })
  ), {dispatch: false});

  //#endregion notifications

}
