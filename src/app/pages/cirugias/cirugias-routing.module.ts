import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirugiasComponent } from './cirugias.component';

const routes: Routes = [{ path: '', component: CirugiasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirugiasRoutingModule { }
