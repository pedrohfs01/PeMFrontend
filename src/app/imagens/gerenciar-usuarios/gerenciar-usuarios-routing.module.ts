import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarUsuariosPage } from './gerenciar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarUsuariosPageRoutingModule {}
