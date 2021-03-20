import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ImagensPage } from './imagens.page';

import { ImagensPageRoutingModule } from './imagens-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagensPageRoutingModule
  ],
  declarations: [ImagensPage]
})
export class ImagensPageModule {}
