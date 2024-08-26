import {Routes} from '@angular/router';
import {AboutComponent} from "./subcomponents/about/about.component";
import {TodoListComponent} from "./subcomponents/todo-list/todo-list.component";
import {LoginComponent} from "./subcomponents/login/login.component";

export const routes: Routes = [
  {path: 'list', component: TodoListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];
