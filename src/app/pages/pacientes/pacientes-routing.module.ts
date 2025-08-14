import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';

const routes: Routes = [
  { path: '', component: PacientesListComponent, data: { title: 'Pacientes' } },
  { path: 'nuevo', component: PacientesFormComponent, data: { title: 'Nuevo Paciente' } },
  { path: 'editar/:id', component: PacientesFormComponent, data: { title: 'Editar Paciente' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
