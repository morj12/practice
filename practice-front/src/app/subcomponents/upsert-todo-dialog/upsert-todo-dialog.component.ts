import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upsert-todo-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './upsert-todo-dialog.component.html',
  styleUrl: './upsert-todo-dialog.component.scss'
})
export class UpsertTodoDialogComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<UpsertTodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, todo?: string },
              private formBuilder: FormBuilder) {
  }

  descriptionForm?: FormGroup;

  formSubscription: Subscription = new Subscription();
  isCorrectForm: boolean = true;

  ngOnInit() {
    this.initDescriptionForm();
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  get confirmationButtonText() {
    return this.data.isUpdate ? 'Update' : 'Add';
  }

  initDescriptionForm() {
    this.descriptionForm = this.formBuilder.group({
      description: [this.data.todo ?? '', [Validators.required, Validators.maxLength(250)]]
    });
    this.formSubscription = this.descriptionForm.get('description')!.valueChanges.subscribe(() => {
      this.isCorrectForm = this.descriptionForm!.get('description')!.valid;
    });
  }

  onCancel() {
    this.dialogRef.close(false);

  }

  onSubmit() {
    this.dialogRef.close(this.descriptionForm!.get('description')?.value);
  }

  protected readonly confirm = confirm;
}
