import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface Pacote {
  id: number;
  destinatario: string;
  endereco_destino: string;
  status: 'pendente' | 'em_transito' | 'entregue' | 'cancelado';
  codigo_rastreamento: string;
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

  // Mock de pacotes - substitua isso por uma chamada real à API
  private mockPacotes: Pacote[] = [
    {
      id: 11223344,
      destinatario: 'João Silva',
      endereco_destino: 'Rua A, 123',
      status: 'entregue',
      codigo_rastreamento: 'ABC123'
    },
    {
      id: 22334455,
      destinatario: 'Maria Oliveira',
      endereco_destino: 'Avenida B, 456',
      status: 'em_transito',
      codigo_rastreamento: 'XYZ456'
    },
    {
      id: 33445566,
      destinatario: 'Carlos Souza',
      endereco_destino: 'Travessa C, 789',
      status: 'pendente',
      codigo_rastreamento: 'LMN789'
    },
    {
      id: 44556677,
      destinatario: 'Ana Costa',
      endereco_destino: 'Rua D, 101',
      status: 'cancelado',
      codigo_rastreamento: 'PQR101'
    },
    {
      id: 55667788,
      destinatario: 'Lucas Pereira',
      endereco_destino: 'Avenida E, 202',
      status: 'entregue',
      codigo_rastreamento: 'STU202'
    }
    
  ];

  ngOnInit(): void {
    this.loadPacotes();
    console.log('Pacotes carregados:', this.pacotes);
  }

  private loadPacotes(): void {
    this._pacotes.set(this.mockPacotes);
  }

  // Getter para usar no template (converte Signal para Array)
  get pacotes(): Pacote[] {
    return this._pacotes();
  }

  // Colunas da tabela - DEVE corresponder às colunas do HTML
  displayedColumns: string[] = [
    'id',
    'destino',
    'status',
    'destinatario',
    'rastreamento',
  ];

  

  constructor() {

  }

}
