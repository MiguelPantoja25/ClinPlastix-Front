import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresupuestosListComponent } from './presupuestos-list/presupuestos-list.component';
import { PresupuestosFormComponent } from './presupuestos-form/presupuestos-form.component';

const routes: Routes = [
  { path: '', component: PresupuestosListComponent, data:{ title: 'Presupuestos'} }, 
  { path: 'nuevo', component: PresupuestosFormComponent, data:{ title: 'Nuevo Presupuesto'} },
  { path: 'editar/:id', component: PresupuestosFormComponent, data:{ title: 'Editar Presupuesto'} } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestosRoutingModule { }
