import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagosFormComponent } from './pagos-form/pagos-form.component';
import { PagosListComponent } from './pagos-list/pagos-list.component';

const routes: Routes = [
  { path: '', component: PagosListComponent },
  { path: 'nuevo', component: PagosFormComponent },
  { path: 'editar/:id', component: PagosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
