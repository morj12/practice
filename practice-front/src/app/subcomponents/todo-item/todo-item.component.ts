import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Todo} from "../../types/todo-list/todo.type";

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    MatButton
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  @Output() onUpdateEvent: EventEmitter<Todo> = new EventEmitter();
  @Output() onUpdateCheckboxEvent: EventEmitter<Todo> = new EventEmitter();
  @Output() onDeleteEvent: EventEmitter<Todo> = new EventEmitter();

  onUpdatedClicked() {
    this.onUpdateEvent.emit(this.todo);
  }

  onDeleteClicked() {
    this.onDeleteEvent.emit(this.todo);
  }

  onCheckboxClicked() {
    this.onUpdateCheckboxEvent.emit(this.todo);
  }
}
