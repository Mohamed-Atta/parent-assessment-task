import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../modules/User';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() user!: User | undefined;
  @Input() mode!: 'add' | 'edit' | 'delete';
  @Output() close = new EventEmitter();

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
  });
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    if (this.mode === 'edit' && Boolean(this.user)) {
      this.registerForm.patchValue({
        jobTitle: 'Manager', // User endpoint doesn't return job title
        name: this.userService.getUserFullName(this.user),
      });
    }
  }

  onSubmit(): void {
    if (this.mode === 'edit') {
      this.userService
        .updateUser(
          this.user?.id,
          this.registerForm.value.name,
          this.registerForm.value.jobTitle
        )
        .subscribe({
          next: () => {
            this.close.emit();
            this.toastr.success(
              'User is updated successfully',
              'Updating User'
            );
          },
          error: () => {
            this.close.emit();
            this.toastr.error('Failed to update user!', 'Updating User');
          },
        });
    } else if (this.mode === 'add') {
      this.userService
        .addUser(this.registerForm.value.name, this.registerForm.value.jobTitle)
        .subscribe({
          next: () => {
            this.close.emit();
            this.toastr.success('User is added successfully', 'Adding User');
          },
          error: () => {
            this.close.emit();
            this.toastr.error('Failed to add user!', 'Adding User');
          },
        });
    }
    this.isSubmitted = true;
  }

  isFormValid(): boolean {
    return !Boolean(
      this.registerForm.get('name')?.invalid ||
        this.registerForm.get('jobTitle')?.invalid
    );
  }

  onDeleteUser(): void {
    this.userService.deleteUser(this.user).subscribe(() => {
      this.close.emit();
      this.toastr.success('User is deleted successfully', 'Deleting User');
    });
  }

  onClickClose() {
    this.close.emit();
  }
}
