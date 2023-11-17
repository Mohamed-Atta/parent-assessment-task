import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './modules/User';
import { HttpResponse } from './modules/HttpResponse';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [ UserService ]
})
export class AppComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(3).subscribe((res: HttpResponse) => {
      this.users = res.data as User[]
      console.log('res', res, this.users)
    });
  }
}
