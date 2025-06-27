import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type TipoPacote = 'documento' | 'pacote' | 'encomenda';
export type TipoEmbalagem = 'caixa' | 'envelope' | 'saco';
export type Prioridade = 'Sim' | 'Não';

export interface AddPacoteFormData {
  destinatario: string;
  destinatario_id: number | null; // ID do usuário, opcional para uso interno
  tipoPacote: TipoPacote;
  dimensoes: string;
  peso: number;
  valorDeclarado: number;
  descricao: string;
  tipoEmbalagem: TipoEmbalagem;
  prioridade: Prioridade;
}

export interface SanitizedPacoteData {
  idClienteDestinatario: number | null; // ID do usuário, opcional para uso interno
  tipoPacote: TipoPacote;
  dimensoes: string;
  peso: number;
  valorDeclarado: number;
  descricaoConteudo: string;
  tipoEmbalagem: TipoEmbalagem;
  prioridade: boolean; // Aqui vira boolean
}


export interface PacoteFormValidation {
  isValid: boolean;
  errors: Partial<Record<keyof AddPacoteFormData, string>>;
}


@Injectable({
  providedIn: 'root'
})

export class AddPacoteFormHandlerService {

  readonly tipoPacote: TipoPacote[] = ['documento', 'pacote', 'encomenda'];
  readonly tipoEmbalagem: TipoEmbalagem[] = ['caixa', 'envelope', 'saco'];
  readonly prioridade: Prioridade[] = ['Sim', 'Não'];

  private _formData = signal<AddPacoteFormData>({
    destinatario: '',
    destinatario_id: null, // ID do usuário, opcional para uso interno
    tipoPacote: this.tipoPacote[0], // 'documento' como padrão
    dimensoes: '',
    peso: 0,
    valorDeclarado: 0,
    descricao: '',
    tipoEmbalagem: this.tipoEmbalagem[0], // 'caixa' como padrão
    prioridade: this.prioridade[0] // 'Não' como padrão
  });

  private _formErrors = signal<Partial<Record<keyof AddPacoteFormData, string>>>({});
  private _isFormValid = signal(false);

  // Propriedades readonly para acesso externo
  formData = this._formData.asReadonly();
  formErrors = this._formErrors.asReadonly();
  isFormValid = this._isFormValid.asReadonly();


  updateField(field: keyof AddPacoteFormData, value: string | number): void {
    const currentData = this._formData();
    const updatedData = { ...currentData, [field]: value };
    this._formData.set(updatedData);
    // Valida automaticamente após cada mudança
    this.validate();
  }

  updateDestinatario(nome: string, id: number | null): void {
    this._formData.update(current => ({
      ...current,
      destinatario: nome,
      destinatario_id: id
    }));
  }

  getSanitizedData(): SanitizedPacoteData {
    const data = this._formData();

    if (!data.destinatario_id) {
      throw new Error('É necessário selecionar um destinatário válido');
    }


    return {
      idClienteDestinatario: data.destinatario_id, // ID do usuário, opcional para uso interno
      tipoPacote: data.tipoPacote,
      dimensoes: data.dimensoes.trim(),
      peso: data.peso,
      valorDeclarado: data.valorDeclarado,
      descricaoConteudo: data.descricao.trim(),
      tipoEmbalagem: data.tipoEmbalagem,
      prioridade: data.prioridade === 'Sim' // Converte 'Sim' para True e 'Não' para False
    };
  }

  validate(): PacoteFormValidation {
    const data = this._formData();
    const errors: Partial<Record<keyof AddPacoteFormData, string>> = {};

    if (!data.destinatario || data.destinatario.trim() === '') { errors.destinatario = 'Destinatário é obrigatório'; }
    if (!data.tipoPacote || data.tipoPacote.trim() === '') { errors.tipoPacote = 'Tipo de pacote é obrigatório'; }
    if (!data.dimensoes || data.dimensoes.trim() === '') { errors.dimensoes = 'Dimensões são obrigatórias'; }
    if (data.peso <= 0) { errors.peso = 'Peso deve ser maior que zero'; }
    if (data.valorDeclarado < 0) { errors.valorDeclarado = 'Valor declarado deve ser maior que zero'; }
    if (!data.descricao || data.descricao.trim() === '') { errors.descricao = 'Descrição é obrigatória'; }
    if (!data.tipoEmbalagem || data.tipoEmbalagem.trim() === '') { errors.tipoEmbalagem = 'Tipo de embalagem é obrigatório'; }
    if (!data.prioridade || data.prioridade.trim() === '') { errors.prioridade = 'Prioridade é obrigatória'; }

    const isValid = Object.keys(errors).length === 0;
    this._formErrors.set(errors);
    this._isFormValid.set(isValid);

    return { isValid, errors };

  }

  clear(): void {
    this._formData.set({
      destinatario: '',
      destinatario_id: null, // ID do usuário, opcional para uso interno
      tipoPacote: 'documento',
      dimensoes: '',
      peso: 0,
      valorDeclarado: 0,
      descricao: '',
      tipoEmbalagem: 'caixa',
      prioridade: 'Não'
    });
    this._formErrors.set({});
    this._isFormValid.set(false);
  }

  getFieldError(field: keyof AddPacoteFormData): string | null {
    return this._formErrors()[field] || null;
  }

  hasFieldError(field: keyof AddPacoteFormData): boolean {
    return !!this._formErrors()[field];
  }

  constructor() { }

}
