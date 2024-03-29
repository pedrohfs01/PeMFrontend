import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbientesPageRoutingModule } from './ambientes-routing.module';

import { AmbientesPage } from './ambientes.page';
import { NotificacoesModalComponent } from './notificacoes-modal/notificacoes-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbientesPageRoutingModule
  ],
  declarations: [AmbientesPage, NotificacoesModalComponent]
})
export class AmbientesPageModule {}
