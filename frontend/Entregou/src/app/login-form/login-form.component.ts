import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormHandlerService, LoginFormData } from '../services/form-handler.service';
import { DatabaseService } from '../services/database.service';
import { LoginRequest } from '../services/database.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private AuthService = inject(DatabaseService);
  private formHandler = inject(FormHandlerService);
  private router = inject(Router);

  touchedFields = signal<Set<keyof LoginFormData>>(new Set());

  hidePassword = true;
  isLoading = false;

  constructor() { }

  onFieldTouch(field: keyof LoginFormData): void {
    const current = new Set(this.touchedFields());
    current.add(field);
    this.touchedFields.set(current);
  }

  onInputChange(event: Event, field: keyof LoginFormData): void {
    const value = (event.target as HTMLInputElement).value;
    this.formHandler.updateFormData(field, value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    const jsonData: LoginFormData = this.formHandler.getSanitizedFormData();

    console.log('Dados do formulário:', jsonData);

    this.touchedFields.set(new Set(['email', 'password']));

    if(!this.isFormValid) return;

  
    this.isLoading = true;

    this.AuthService.login(jsonData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
        console.log('Login bem-sucedido:', response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao fazer login:', error);
        // Adicionar Mensagem de erro depois
      },
      
    });

  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get formData() {
    return this.formHandler.formData();
  }

  get formErrors() {
    return this.formHandler.formErrors();
  }

  get isFormValid() {
    return this.formHandler.isFormValid();
  }

  get isFormFilled() {
    return this.formHandler.isFormFilled();
  }

  hasError(field: keyof LoginFormData): boolean {
    return this.touchedFields().has(field) && this.formHandler.hasFieldError(field);
  }

  getError(field: keyof LoginFormData): string | null {
    return this.formHandler.getFieldError(field);
  }
}
