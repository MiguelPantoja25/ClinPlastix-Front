import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasFormComponent } from './citas-form/citas-form.component';

const routes: Routes = [
  { path: '', component: CitasFormComponent, data: { title: 'Nueva Cita' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule { }
