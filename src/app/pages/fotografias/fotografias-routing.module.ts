import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotografiasComponent } from './fotografias.component';

const routes: Routes = [{ path: '', component: FotografiasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotografiasRoutingModule { }
