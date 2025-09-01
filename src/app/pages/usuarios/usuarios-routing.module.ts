import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

const routes: Routes = [
  { path: '', component: UsuariosListComponent, data: { title: 'Usuarios' } },
  { path: 'nuevo', component: UsuariosFormComponent, data: { title: 'Nuevo Usuario' } },
  { path: 'editar/:id', component: UsuariosFormComponent, data: { title: 'Editar Usuario' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
