import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'citas' },
  { path: 'medicos', loadComponent: () => import('./features/medicos/medicos.page').then((m) => m.MedicosPage) },
  { path: 'citas', loadComponent: () => import('./features/citas/citas.page').then((m) => m.CitasPage) },
  { path: '**', redirectTo: 'citas' },
];
