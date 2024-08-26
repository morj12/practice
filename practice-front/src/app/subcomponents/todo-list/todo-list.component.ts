import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {skipWhile, Subscription, tap} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Todo} from "../../types/todo-list/todo.type";
import {UserService} from "../../services/user/user.service";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../../ngrx/todo-list/actions";
import {selectTodos} from "../../ngrx/todo-list/selectors";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UpsertTodoDialogComponent} from "../upsert-todo-dialog/upsert-todo-dialog.component";

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    NgForOf,
    TodoItemComponent,
    NgIf,
    MatProgressSpinner,
    FormsModule,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];

  confirmationDialogSubscription: Subscription = new Subscription();
  createDialogSubscription: Subscription = new Subscription();
  updateDialogSubscription: Subscription = new Subscription();
  storeSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router, private store: Store, private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.userService.currentUser) this.router.navigate(['login']);
    else {
      this.selectTodos();
      this.store.dispatch(getTodos({userId: this.userService.currentUser.id}));
    }
  }

  ngOnDestroy() {
    this.createDialogSubscription.unsubscribe();
    this.updateDialogSubscription.unsubscribe();
    this.confirmationDialogSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  selectTodos() {
    this.storeSubscription = this.store.select(selectTodos)
      .pipe(
        skipWhile((todos: Todo[]) => !todos.length),
        tap((todos: Todo[]) => {
          this.todos = JSON.parse(JSON.stringify(todos));
        })
      )
      .subscribe();
  }

  onAddTodo() {
    const dialogRef = this.dialog.open(UpsertTodoDialogComponent, {
      width: '600px',
      data: {isUpdate: false}
    });

    this.createDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) this.store.dispatch(addTodo({
        todo: {
          id: 0,
          title: result,
          userId: this.userService.currentUser!.id,
          completed: false
        }
      }));
    });
  }

  onUpdateTodo(todo: Todo) {
    const dialogRef = this.dialog.open(UpsertTodoDialogComponent, {
      width: '800px',
      data: {isUpdate: true, todo: todo.title}
    });

    this.updateDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result !== todo.title) this.store.dispatch(updateTodo({
        todo: {
          ...todo,
          title: result
        }
      }))
    });
  }

  onDeleteTodo(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {message: `Do you really want to delete this item?`}
    });

    this.confirmationDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) this.store.dispatch(deleteTodo({todo: todo}))
    });
  }

  onUpdateCheckboxEvent(todo: Todo) {
    this.store.dispatch(updateTodo({todo: todo}))
  }
}
