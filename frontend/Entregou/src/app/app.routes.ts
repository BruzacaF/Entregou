import { Routes } from '@angular/router';
import { DashboardComponent } from './admin-dashboard/dashboard.component';
import { RelatoriosComponent } from './admin-dashboard/relatorios/relatorios.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MonitoramentoComponent } from './admin-dashboard/monitoramento/monitoramento.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from './guardRoutes/auth.guard';
import { roleGuard } from './guardRoutes/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Bem-vindo ao Entregou',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard], // Protege a rota do dashboard
    title: 'Dashboard - Entregou',
    data: { role: 'ADMIN' }, // Define o papel necessário para acessar o dashboard
    children: [
      { path: '', redirectTo: 'monitoramento', pathMatch: 'full' }, // Rota padrão
      { path: 'relatorios', component: RelatoriosComponent, title: 'Relatórios - Entregou' },
      { path: 'monitoramento', component: MonitoramentoComponent, title: 'Monitoramento - Entregou' },

    ]
  },
  { 
    path: 'UserDashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, roleGuard], // Protege a rota do UserDashboard
    title: 'User Dashboard - Entregou',
    data: { role: 'CLIENTE' }, // Define o papel necessário para acessar o UserDashboard
  },
  { path: '**', redirectTo: '' }
];
