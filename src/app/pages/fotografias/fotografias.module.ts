import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotografiasRoutingModule } from './fotografias-routing.module';
import { FotografiasComponent } from './fotografias.component';


@NgModule({
  declarations: [
    FotografiasComponent
  ],
  imports: [
    CommonModule,
    FotografiasRoutingModule
  ]
})
export class FotografiasModule { }
