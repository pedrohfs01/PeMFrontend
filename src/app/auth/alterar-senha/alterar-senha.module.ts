import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AlterarSenhaRoutingModule } from './alterar-senha-routing.module';
import { AlterarSenhaPage } from './alterar-senha.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AlterarSenhaRoutingModule
  ],
  declarations: [AlterarSenhaPage]
})
export class AlterarSenhaModule {}
