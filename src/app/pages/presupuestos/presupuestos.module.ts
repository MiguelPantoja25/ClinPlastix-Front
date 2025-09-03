import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { PresupuestosListComponent } from './presupuestos-list/presupuestos-list.component';
import { PresupuestosFormComponent } from './presupuestos-form/presupuestos-form.component';


@NgModule({
  declarations: [
    PresupuestosListComponent,
    PresupuestosFormComponent
  ],
  imports: [
    CommonModule,
    PresupuestosRoutingModule
  ]
})
export class PresupuestosModule { }
