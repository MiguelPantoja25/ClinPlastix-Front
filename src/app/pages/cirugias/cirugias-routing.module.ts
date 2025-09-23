import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirugiasListComponent } from './cirugias-list/cirugias-list.component';
import { CirugiasFormComponent } from './cirugias-form/cirugias-form.component';
//import { Title } from '@angular/platform-browser';

const routes: Routes = [{ path: '', component: CirugiasListComponent, data:{ title:'Cirugias'} },
  { path: 'nuevo', component: CirugiasFormComponent, data:{ title:'Nueva Cirugia'}},
  { path: 'editar/:id', component: CirugiasFormComponent, data:{ title:'Editar Cirugia'} },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirugiasRoutingModule { }


