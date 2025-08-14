import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { EgresosComponent } from './egresos.component';


@NgModule({
  declarations: [
    EgresosComponent
  ],
  imports: [
    CommonModule,
    EgresosRoutingModule
  ]
})
export class EgresosModule { }
