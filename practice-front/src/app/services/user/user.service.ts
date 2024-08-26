import {Injectable} from "@angular/core";
import {User} from "../../types/todo-list/user.type";

@Injectable({providedIn: 'root'})
export class UserService {
  currentUser?: User;
}
