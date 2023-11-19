import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/User';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() user!: User | undefined;
  @Output() close = new EventEmitter();

  constructor(private userService: UserService) {}

  getUserFullName(user: User) {
    return this.userService.getUserFullName(user)
  }

  onClickClose() {
    this.close.emit();
  }

  onEditUser(): void {}

  onDeleteUser(): void {}
}
