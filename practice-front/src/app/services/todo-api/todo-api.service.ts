import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../../types/todo-list/todo.type";
import {UserModel} from "./models/user.model";
import {TodoModel} from "./models/todo.model";

@Injectable({providedIn: 'root'})
export class TodoApiService {

  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';  // FAKE API
  // private readonly baseUrl = 'http://localhost:5298/Todo';                // LOCAL API

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.baseUrl}/users`);
  }

  getUserTodos(userId: number): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(`${this.baseUrl}/todos?userId=${userId}`);
  }

  addTodo(todo: Todo): Observable<TodoModel> {
    return this.httpClient.post<TodoModel>(`${this.baseUrl}/todos`, todo);
  }

  updateTodo(todo: Todo): Observable<TodoModel> {
    return this.httpClient.patch<TodoModel>(`${this.baseUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/todos/${todoId}`)
  }

}
