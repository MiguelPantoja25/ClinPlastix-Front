import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { PresupuestosComponent } from './presupuestos.component';


@NgModule({
  declarations: [
    PresupuestosComponent
  ],
  imports: [
    CommonModule,
    PresupuestosRoutingModule
  ]
})
export class PresupuestosModule { }
