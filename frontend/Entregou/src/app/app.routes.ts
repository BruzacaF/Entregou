import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RelatoriosComponent} from './dashboard/relatorios/relatorios.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MonitoramentoComponent } from './dashboard/monitoramento/monitoramento.component';
import { authGuard } from './guardRoutes/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Bem-vindo ao Entregou',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Protege a rota do dashboard
    title: 'Dashboard - Entregou',
    children: [
      { path: '', redirectTo: 'monitoramento', pathMatch: 'full' }, // Rota padrão
      { path: 'relatorios', component: RelatoriosComponent, title: 'Relatórios - Entregou' },
      { path: 'monitoramento', component: MonitoramentoComponent, title: 'Monitoramento - Entregou' },
    
    ]
  },
  { path: '**', redirectTo: '' }
];
