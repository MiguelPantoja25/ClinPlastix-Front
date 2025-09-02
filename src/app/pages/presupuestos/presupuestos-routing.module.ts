import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresupuestosListComponent } from './presupuestos-list/presupuestos-list.component';


const routes: Routes = [{ path: '', component: PresupuestosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestosRoutingModule { }
