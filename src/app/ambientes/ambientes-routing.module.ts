import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbientesPage } from './ambientes.page';

const routes: Routes = [
  {
    path: '',
    component: AmbientesPage
  },
  {
    path: 'novo-ambiente',
    loadChildren: () => import('./novo-ambiente/novo-ambiente.module').then( m => m.NovoAmbientePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbientesPageRoutingModule {}
