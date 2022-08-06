import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoAmbientePageRoutingModule } from './novo-ambiente-routing.module';

import { NovoAmbientePage } from './novo-ambiente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NovoAmbientePageRoutingModule
  ],
  declarations: [NovoAmbientePage]
})
export class NovoAmbientePageModule {}
