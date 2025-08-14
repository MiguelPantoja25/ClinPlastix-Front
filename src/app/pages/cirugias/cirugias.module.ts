import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirugiasRoutingModule } from './cirugias-routing.module';
import { CirugiasComponent } from './cirugias.component';


@NgModule({
  declarations: [
    CirugiasComponent
  ],
  imports: [
    CommonModule,
    CirugiasRoutingModule
  ]
})
export class CirugiasModule { }
