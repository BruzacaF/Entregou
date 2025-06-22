import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { PacoteDiaComponent } from './pacote-dia/pacote-dia.component';
import { ListarPacoteComponent } from './listar-pacote/listar-pacote.component';
import { AdicionarPacoteComponent } from './adicionar-pacote/adicionar-pacote.component';

// Interfaces aprimoradas
export interface Pacote {
  id: number;
  nome: string;
  tipo_pacote: 'documento' | 'produto' | 'alimento' | 'fragil';
  descricao: string;
  peso: number;
  dataEntrega: Date;
  status: 'pendente' | 'em_transito' | 'entregue' | 'cancelado';
  destinatario: string;
  endereco_destino: string;
  valor?: number;
  codigo_rastreamento: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  telefone?: string;
  avatar?: string;
  tipo_usuario: 'cliente' | 'entregador' | 'admin';
}

export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  lida: boolean;
  data: Date;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    PacoteDiaComponent,
    ListarPacoteComponent,
    AdicionarPacoteComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  usuario = signal<Usuario | null>(null);

  constructor() {
    this.usuario = signal<Usuario>({
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      endereco: 'Rua Exemplo, 123',
      telefone: '1234-5678',
      tipo_usuario: 'cliente'
    });
  }

}
