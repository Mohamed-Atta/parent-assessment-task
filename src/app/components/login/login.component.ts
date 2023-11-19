import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return !Boolean(
      this.registerForm.get('email')?.invalid ||
        this.registerForm.get('password')?.invalid
    );
  }

  onSubmit(): void {
    this.authService.login(
      this.registerForm.value.email || '',
      this.registerForm.value.password || ''
    ).subscribe((res: any) => {
      this.router.navigate(['/users'])
    });;
    this.isSubmitted = true;
  }
}
