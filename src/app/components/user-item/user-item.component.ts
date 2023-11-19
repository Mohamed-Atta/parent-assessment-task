import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../modules/User';
import { UserService } from '../../services/user.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  @Input() user!: User;
  @Input() isLast!: boolean;
  @Input() isActive!: boolean;

  constructor(private userService: UserService) {}

  getUserFullName(user: User) {
    return this.userService.getUserFullName(user)
  }
}
