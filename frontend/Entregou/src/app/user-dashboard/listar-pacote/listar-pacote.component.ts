import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatabaseService } from '../../services/database.service';

export interface Pacote {
  id?: number;
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
    MatChipsModule
  ],
  templateUrl: './listar-pacote.component.html',
  styleUrls: ['./listar-pacote.component.scss']
})
export class ListarPacoteComponent implements OnInit {
  // Signal para os pacotes
  private _pacotes = signal<Pacote[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

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

  constructor(private databaseService: DatabaseService) {}

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
}
