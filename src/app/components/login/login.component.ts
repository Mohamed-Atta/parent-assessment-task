import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    public authService: AuthService
  ) {}

  onSubmit(): void {
    console.log(
      'submitted form',
      this.registerForm.value,
      this.registerForm.invalid
    );
    this.authService.login(
      this.registerForm.value.email || '',
      this.registerForm.value.password || ''
    ).subscribe((res: any) => {
      console.log('login response', res)
    });;
    this.isSubmitted = true;
  }
}
