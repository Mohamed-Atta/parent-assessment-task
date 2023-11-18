import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/User';
import { HttpResponse } from '../../modules/HttpResponse';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserItemComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(1).subscribe((res: HttpResponse) => {
      this.users = res.data as User[];
    });
  }

  getUserFullName(user: User) {
    return this.userService.getUserFullName(user)
  }
}
