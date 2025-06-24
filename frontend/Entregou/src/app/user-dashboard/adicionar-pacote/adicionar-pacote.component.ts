import { Component, inject, signal } from '@angular/core';
import { AddPacoteFormHandlerService, AddPacoteFormData, TipoEmbalagem, TipoPacote, Prioridade } from '../../services/cliente-services/add-pacote-form-handler.service';
import { DatabaseService } from '../../services/database.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UsuarioAutoComplete } from '../../services/database.service';


@Component({
  selector: 'app-adicionar-pacote',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './adicionar-pacote.component.html',
  styleUrls: ['./adicionar-pacote.component.scss']
})
export class AdicionarPacoteComponent {

  // Injeção de dependências

  private formHandler = inject(AddPacoteFormHandlerService);
  private databaseService = inject(DatabaseService);

  tipoPacoteOptions: TipoPacote[] = this.formHandler.tipoPacote;
  tipoEmbalagemOptions: TipoEmbalagem[] = this.formHandler.tipoEmbalagem;
  prioridadeOptions: Prioridade[] = this.formHandler.prioridade;

  formData = this.formHandler.formData;
  isLoading = signal(false);
  successMessage = signal<boolean | null>(null);
  touchedFields = signal<Record<string, boolean>>({});

  // Propriedades para autocomplete
  usuarios = signal<UsuarioAutoComplete[]>([]);
  mostrarSugestoes = signal(false);
  buscandoUsuarios = signal(false);
  usuarioSelecionado = signal<UsuarioAutoComplete | null>(null);
  private searchSubject = new Subject<string>();


  onFieldChange(event: Event, field: keyof AddPacoteFormData): void {

    const target = event.target as HTMLInputElement | HTMLSelectElement;
    let value: string | number = target.value;

    // Converte para number se o campo for numérico
    if (field === 'peso' || field === 'valorDeclarado') {
      value = parseFloat(value);
    }

    this.formHandler.updateField(field, value);
    this.touchedFields.set({ ...this.touchedFields(), [field]: true });

    if (field === 'destinatario') {
      this.formHandler.updateDestinatario(value as string, null);
      this.usuarioSelecionado.set(null);
      this.searchSubject.next(value as string);
    } else {
      this.formHandler.updateField(field, value);
    }
  }

  onDestinatarioFocus(): void {
    const termo = this.formData().destinatario;
    if (termo && termo.length >= 2) {
      this.searchSubject.next(termo);
    }
  }

  // Método para ocultar sugestões quando perder o foco
  onDestinatarioBlur(): void {
    // Pequeno delay para permitir clique nas sugestões
    setTimeout(() => {
      this.mostrarSugestoes.set(false);
    }, 200);
    this.onFieldBlur('destinatario');
  }

  onFieldBlur(field: keyof AddPacoteFormData): void {
    this.touchedFields.set({ ...this.touchedFields(), [field]: true });
  }


  onSubmit(event: Event): void {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    if (this.formHandler.isFormValid()) {
      this.adicionarPacote();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.touchedFields.set({
        ...this.touchedFields(),
        ...Object.keys(this.formData()).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      });
    }

  }

  adicionarPacote(): void {
    this.isLoading.set(true);

    try {
      const dadosParaEnvio = this.formHandler.getSanitizedData();
      console.log('Dados do pacote a serem enviados:', dadosParaEnvio);

    this.databaseService.adicionarPacote(dadosParaEnvio).subscribe({
      next: () => {
        this.successMessage.set(true);
        this.formHandler.clear();
        this.usuarioSelecionado.set(null);
        this.usuarios.set([]);
        this.mostrarSugestoes.set(false);
        console.log('Pacote adicionado com sucesso!');
      },
      error: () => {
        this.successMessage.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  } catch (error) {
      console.error('Erro ao adicionar pacote:', error);
      this.successMessage.set(false);
      this.isLoading.set(false);
    }
  }

  hasError(field: keyof AddPacoteFormData): boolean {
    return this.touchedFields()[field] && this.formHandler.hasFieldError(field);
  }

  getError(field: keyof AddPacoteFormData): string | null {
    return this.hasError(field) ? this.formHandler.getFieldError(field) : null;
  }


  selecionarUsuario(usuario: UsuarioAutoComplete): void {
    this.usuarioSelecionado.set(usuario);

    // Atualiza tanto o nome quanto o ID no formulário
    this.formHandler.updateDestinatario(usuario.nome, usuario.id);

    this.mostrarSugestoes.set(false);
    this.touchedFields.set({ ...this.touchedFields(), destinatario: true });
  }

  limparSelecaoUsuario(): void {
    this.usuarioSelecionado.set(null);
    this.formHandler.updateDestinatario('', null);
    this.usuarios.set([]);
    this.mostrarSugestoes.set(false);
  }

  // Autocomplete de usuários
  private setupAutocomplete(): void {
    this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms após parar de digitar
      distinctUntilChanged(), // Só busca se o termo mudou
      switchMap(termo => {
        if (termo.length < 2) {
          this.usuarios.set([]);
          this.mostrarSugestoes.set(false);
          return [];
        }

        this.buscandoUsuarios.set(true);
        return this.databaseService.buscarUsuarios(termo);
      })
    ).subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios);
        this.mostrarSugestoes.set(usuarios.length > 0);
        this.buscandoUsuarios.set(false);
      },
      error: (error) => {
        console.error('Erro na busca:', error);
        this.usuarios.set([]);
        this.mostrarSugestoes.set(false);
        this.buscandoUsuarios.set(false);
      }
    });
  }

  constructor() {
    this.formHandler.clear();
    this.setupAutocomplete();

  }
}
