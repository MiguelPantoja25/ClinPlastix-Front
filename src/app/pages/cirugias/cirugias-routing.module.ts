import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirugiasListComponent } from './cirugias-list/cirugias-list.component';

const routes: Routes = [{ path: '', component: CirugiasListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirugiasRoutingModule { }


