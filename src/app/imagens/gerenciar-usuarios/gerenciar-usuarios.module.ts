import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciarUsuariosPageRoutingModule } from './gerenciar-usuarios-routing.module';

import { GerenciarUsuariosPage } from './gerenciar-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciarUsuariosPageRoutingModule
  ],
  declarations: [GerenciarUsuariosPage]
})
export class GerenciarUsuariosPageModule {}
