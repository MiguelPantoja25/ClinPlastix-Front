import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { titulo: 'ClinPlatix' } },
  { path: 'pacientes', loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule), data: { titulo: 'Pacientes' } },
  { path: 'citas', loadChildren: () => import('./pages/citas/citas.module').then(m => m.CitasModule), data: { titulo: 'Citas' } },
  { path: 'expediente', loadChildren: () => import('./pages/expediente/expediente.module').then(m => m.ExpedienteModule), data: { titulo: 'Expediente' } },
  { path: 'fotografias', loadChildren: () => import('./pages/fotografias/fotografias.module').then(m => m.FotografiasModule), data: { titulo: 'Fotografias' } },
  { path: 'cirugias', loadChildren: () => import('./pages/cirugias/cirugias.module').then(m => m.CirugiasModule), data: { titulo: 'Cirugias' } },
  { path: 'presupuestos', loadChildren: () => import('./pages/presupuestos/presupuestos.module').then(m => m.PresupuestosModule), data: { titulo: 'Presupuestos' } },
  { path: 'pagos', loadChildren: () => import('./pages/pagos/pagos.module').then(m => m.PagosModule), data: { titulo: 'Pagos' } },
  { path: 'egresos', loadChildren: () => import('./pages/egresos/egresos.module').then(m => m.EgresosModule), data: { titulo: 'Egresos' } },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule), data: { titulo: 'Usuarios' } },
  { path: 'configuracion', loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionModule), data: { titulo: 'Configuracion' } },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
