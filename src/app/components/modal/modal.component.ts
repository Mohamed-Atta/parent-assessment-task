import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() close = new EventEmitter();

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    jobTitle: ['', Validators.required],
  });
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  onSubmit(): void {
    this.isSubmitted = true;
  }

  isFormValid(): boolean {
    return !Boolean(
      this.registerForm.get('name')?.invalid ||
        this.registerForm.get('jobTitle')?.invalid
    );
  }

  onClickClose() {
    this.close.emit();
  }
}
