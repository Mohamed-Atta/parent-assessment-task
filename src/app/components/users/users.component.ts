import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/User';
import { HttpResponse } from '../../modules/HttpResponse';
import { UserItemComponent } from '../user-item/user-item.component';
import { ModalComponent } from '../modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../loading/loading.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserItemComponent,
    ModalComponent,
    LoadingComponent,
    ButtonComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showModal: boolean = true;
  loading: boolean = true;
  pageNumber: number = 1;
  totalPages: number = 0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('scroll');
      if (this.pageNumber <= this.totalPages) {
        this.pageNumber++;
        this.loading = true;
        this.userService
          .getUsers(this.pageNumber)
          .subscribe((res: HttpResponse) => {
            this.users.push(...(res.data as User[]));
            this.loading = false;
          });
      }
    }
  }

  ngOnInit(): void {
    this.userService
      .getUsers(this.pageNumber)
      .subscribe((res: HttpResponse) => {
        this.totalPages = res.total_pages || 0;
        this.users = res.data as User[];
        this.loading = false;
      });
  }

  getUserFullName(user: User) {
    return this.userService.getUserFullName(user);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
