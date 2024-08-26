import {Component, OnDestroy, OnInit} from '@angular/core';
import {skipWhile, Subscription, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {User} from "../../types/todo-list/user.type";
import {UserService} from "../../services/user/user.service";
import {getUsers} from "../../ngrx/todo-list/actions";
import {selectUsers} from "../../ngrx/todo-list/selectors";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatError,
    MatProgressSpinner,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  currentUser?: User;
  users: User[] = [];

  emailForm: FormGroup = new FormGroup({});
  formSubscription?: Subscription = new Subscription();
  formSubmitted: boolean = false;
  isCorrectEmail: boolean = true;

  storeSubscription?: Subscription = new Subscription();

  constructor(private store: Store, private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.selectUsers();
    this.store.dispatch(getUsers());
    this.initEmailForm();
  }

  selectUsers() {
    this.storeSubscription = this.store.select(selectUsers)
      .pipe(
        skipWhile((users: User[]) => !users.length),
        tap((users: User[]) => {
          this.users = users;
          this.currentUser = this.users.find(user => user.name == localStorage.getItem('userName'));
          this.navigateIfUserExists();
        })
      )
      .subscribe();
  }

  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formSubscription = this.emailForm.get('email')!.valueChanges.subscribe((value) => {
      this.isCorrectEmail = value.length === 0 ? true : this.emailForm.get('email')!.valid;
      this.formSubmitted = false;
    });
  }

  ngOnDestroy() {
    this.formSubscription?.unsubscribe();
    this.storeSubscription?.unsubscribe();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.currentUser = this.users.find(user => user.email === this.emailForm.value.email);

    this.navigateIfUserExists();
  }


  navigateIfUserExists() {
    if (this.currentUser) {
      this.userService.currentUser = this.currentUser;
      localStorage.setItem('userName', this.currentUser!.name);
      this.router.navigate(['list']);
    }
  }
}
