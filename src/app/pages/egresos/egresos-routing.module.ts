import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresosListComponent } from './egresos-list/egresos-list.component';
import { EgresosFormComponent } from './egresos-form/egresos-form.component';

const routes: Routes = [
  { path: '', component: EgresosListComponent },
  { path: 'nuevo', component: EgresosFormComponent },
  { path: 'editar/:id', component: EgresosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresosRoutingModule {}
