import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirugiasRoutingModule } from './cirugias-routing.module';
import { CirugiasComponent } from './cirugias.component';
import { CirugiasListComponent } from './cirugias-list/cirugias-list.component';
import { CirugiasFormComponent } from './cirugias-form/cirugias-form.component';


@NgModule({
  declarations: [
    CirugiasComponent,
    CirugiasListComponent,
    CirugiasFormComponent
  ],
  imports: [
    CommonModule,
    CirugiasRoutingModule
  ]
})
export class CirugiasModule { }
