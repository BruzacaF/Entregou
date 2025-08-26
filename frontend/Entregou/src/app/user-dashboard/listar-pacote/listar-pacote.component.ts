import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatabaseService } from '../../services/database.service';
import { ModalConfirmacaoComponent, ConfirmDeleteData } from '../modal-confirmacao/modal-confirmacao.component';

export interface Pacote {
  id: number;
  destinatario: string;
  remetente: string;
  tipoPacote: string;
  codigoRastreio: string | null;
  descricaoConteudo: string;
  prioridade: boolean;
  endereco_destino?: string;
  status?: 'pendente' | 'em_transito' | 'entregue' | 'cancelado';
  codigo_rastreamento?: string;
}

@Component({
  selector: 'app-listar-pacote',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './listar-pacote.component.html',
  styleUrls: ['./listar-pacote.component.scss']
})
export class ListarPacoteComponent implements OnInit {
  // Signal para os pacotes
  private _pacotes = signal<Pacote[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _deleting = signal<number | null>(null);

  // Getter para usar no template (converte Signal para Array)
  get pacotes(): Pacote[] {
    return this._pacotes();
  }

  get loading(): boolean {
    return this._loading();
  }

  get error(): string | null {
    return this._error();
  }

  get deleting(): number | null {
    return this._deleting();
  }

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarPacotes();
  }

  private carregarPacotes(): void {
    this._loading.set(true);
    this._error.set(null);

    this.databaseService.listarMeusPacotes().subscribe({
      next: (pacotes) => {
        this._pacotes.set(pacotes);
        this._loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar pacotes:', error);
        this._error.set('Erro ao carregar pacotes. Tente novamente.');
        this._loading.set(false);
      }
    });
  }

  // Colunas da tabela - DEVE corresponder às colunas do HTML
  displayedColumns: string[] = [
    'destinatario',
    'remetente',
    'tipoPacote',
    'codigoRastreio',
    'descricaoConteudo',
    'prioridade',
    'acoes'
  ];

  // Método para recarregar os dados
  recarregar(): void {
    this.carregarPacotes();
  }

  // Métodos utilitários
  getPrioridadeText(prioridade: boolean): string {
    return prioridade ? 'Alta' : 'Normal';
  }

  getPrioridadeColor(prioridade: boolean): string {
    return prioridade ? '#f44336' : '#4caf50';
  }

  getStatusColor(status?: string): string {
    switch(status) {
      case 'pendente': return '#ff9800';
      case 'em_transito': return '#2196f3';
      case 'entregue': return '#4caf50';
      case 'cancelado': return '#f44336';
      default: return '#757575';
    }
  }

  getStatusText(status?: string): string {
    switch(status) {
      case 'pendente': return 'Pendente';
      case 'em_transito': return 'Em Trânsito';
      case 'entregue': return 'Entregue';
      case 'cancelado': return 'Cancelado';
      default: return 'N/A';
    }
  }

  apagarPacote(pacote: Pacote): void {
    if (!pacote.id) {
      this.snackBar.open('Erro: ID do pacote não encontrado', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Configura os dados do modal
    const dialogData: ConfirmDeleteData = {
      destinatario: pacote.destinatario,
      titulo: 'Confirmar Exclusão do Pacote',
      mensagem: 'Tem certeza que deseja apagar o pacote para:'
    };

    // Abre o modal de confirmação
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: dialogData,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      width: '450px',
      panelClass: ['custom-dialog-container']
    });

    // Processa o resultado do modal
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && pacote.id) {
        this._deleting.set(pacote.id);

        this.databaseService.apagarPacote(pacote.id).subscribe({
          next: () => {
            // Remove o pacote da lista local
            const pacotesAtuais = this._pacotes();
            const novosPacotes = pacotesAtuais.filter(p => p.id !== pacote.id);
            this._pacotes.set(novosPacotes);

            this.snackBar.open('Pacote apagado com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this._deleting.set(null);
          },
          error: (error) => {
            console.error('Erro ao apagar pacote:', error);
            this.snackBar.open('Erro ao apagar pacote. Tente novamente.', 'Fechar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this._deleting.set(null);
          }
        });
      }
    });
  }

  isDeletingPacote(id?: number): boolean {
    return this.deleting === id;
  }
}
