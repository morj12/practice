import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MatToolbar, RouterLink, RouterLinkActive, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Todo app';

  constructor(protected userService: UserService, private router: Router) {
  }

  onLogoutClicked() {
    this.userService.currentUser = undefined;
    localStorage.removeItem('userName');
    this.router.navigate(['login']);
  }
}
