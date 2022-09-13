import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {HttpClientModule} from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImgService } from './imagens/img.service';
import { ImageUtilService } from './imagens/img-util.service';
import { UsuarioService } from './auth/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmbienteService } from './ambientes/ambiente.service';
import { StorageService } from './auth/storage.service';
import { TooltipsModule } from 'ionic4-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TooltipsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImgService,
    ImageUtilService,
    UsuarioService,
    AmbienteService,
    StorageService,
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
