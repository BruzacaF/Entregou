import { Injectable, signal } from '@angular/core';

// Interface para os dados do formulário
export interface LoginFormData {
  email: string;
  password: string;
}

// Interface para validação de formulário
export interface FormValidation {
  isValid: boolean;
  errors: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {
  
  // Signals para armazenar os dados do formulário
  private _formData = signal<LoginFormData>({ email: '', password: '' });
  private _formErrors = signal<{ [key: string]: string }>({});
  private _isFormValid = signal(false);

  // Propriedades readonly para acesso externo
  formData = this._formData.asReadonly();
  formErrors = this._formErrors.asReadonly();
  isFormValid = this._isFormValid.asReadonly();

  constructor() { }

  /**
   * Atualiza os dados do formulário
   */
  updateFormData(field: keyof LoginFormData, value: string): void {
    const currentData = this._formData();
    const updatedData = { ...currentData, [field]: value };
    this._formData.set(updatedData);
    
    // Valida automaticamente após cada mudança
    this.validateForm();
  }

  /**
   * Define todos os dados do formulário de uma vez
   */
  setFormData(data: LoginFormData): void {
    this._formData.set(data);
    this.validateForm();
  }

  /**
   * Valida todos os campos do formulário
   */
  validateForm(): FormValidation {
    const data = this._formData();
    const errors: { [key: string]: string } = {};

    // Validação do email/usuário
    if (!data.email || data.email.trim() === '') {
      errors['email'] = 'Email ou usuário é obrigatório';
    } else if (data.email.includes('@') && !this.isValidEmail(data.email)) {
      errors['email'] = 'Formato de email inválido';
    } else if (data.email.trim().length < 3) {
      errors['email'] = 'Email ou usuário deve ter pelo menos 3 caracteres';
    }

    // Validação da senha
    if (!data.password || data.password.trim() === '') {
      errors['password'] = 'Senha é obrigatória';
    } else if (data.password.length < 6) {
      errors['password'] = 'Senha deve ter pelo menos 6 caracteres';
    } else if (data.password.length > 50) {
      errors['password'] = 'Senha não pode ter mais de 50 caracteres';
    }

    const isValid = Object.keys(errors).length === 0;
    
    // Atualiza os signals
    this._formErrors.set(errors);
    this._isFormValid.set(isValid);

    return { isValid, errors };
  }

  /**
   * Valida um campo específico
   */
  validateField(field: keyof LoginFormData): string | null {
    const data = this._formData();
    const value = data[field];

    switch (field) {
      case 'email':
        if (!value || value.trim() === '') {
          return 'Email ou usuário é obrigatório';
        }
        if (value.includes('@') && !this.isValidEmail(value)) {
          return 'Formato de email inválido';
        }
        if (value.trim().length < 3) {
          return 'Email ou usuário deve ter pelo menos 3 caracteres';
        }
        break;

      case 'password':
        if (!value || value.trim() === '') {
          return 'Senha é obrigatória';
        }
        if (value.length < 6) {
          return 'Senha deve ter pelo menos 6 caracteres';
        }
        if (value.length > 50) {
          return 'Senha não pode ter mais de 50 caracteres';
        }
        break;
    }

    return null;
  }

  /**
   * Obtém os dados atuais do formulário
   */
  getFormData(): LoginFormData {
    return this._formData();
  }

  /**
   * Obtém os dados sanitizados do formulário
   */
  getSanitizedFormData(): LoginFormData {
    const data = this._formData();
    return {
      email: this.sanitizeInput(data.email),
      password: data.password // Senha não deve ser sanitizada
    };
  }

  /**
   * Limpa todos os dados do formulário
   */
  clearForm(): void {
    this._formData.set({ email: '', password: '' });
    this._formErrors.set({});
    this._isFormValid.set(false);
  }

  /**
   * Limpa apenas os erros
   */
  clearErrors(): void {
    this._formErrors.set({});
  }

  /**
   * Verifica se um campo específico tem erro
   */
  hasFieldError(field: keyof LoginFormData): boolean {
    const errors = this._formErrors();
    return !!errors[field];
  }

  /**
   * Obtém o erro de um campo específico
   */
  getFieldError(field: keyof LoginFormData): string | null {
    const errors = this._formErrors();
    return errors[field] || null;
  }

  /**
   * Verifica se o formulário está preenchido
   */
  isFormFilled(): boolean {
    const data = this._formData();
    return data.email.trim() !== '' && data.password.trim() !== '';
  }

  /**
   * Obtém estatísticas do formulário
   */
  getFormStats() {
    const data = this._formData();
    return {
      emailLength: data.email.length,
      passwordLength: data.password.length,
      isFilled: this.isFormFilled(),
      isValid: this._isFormValid(),
      errorsCount: Object.keys(this._formErrors()).length
    };
  }

  /**
   * Valida formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sanitiza entrada (remove espaços, converte para lowercase apenas o email)
   */
  private sanitizeInput(input: string): string {
    return input.trim().toLowerCase();
  }

  /**
   * Método auxiliar para debugging
   */
  debugFormState() {
    console.log('Form Data:', this._formData());
    console.log('Form Errors:', this._formErrors());
    console.log('Is Valid:', this._isFormValid());
    console.log('Is Filled:', this.isFormFilled());
  }
}
