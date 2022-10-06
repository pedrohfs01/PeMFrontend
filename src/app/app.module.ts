import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {HttpClientModule} from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageUtilService } from './services/img-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmbienteService } from './services/ambiente.service';
import { StorageService } from './services/storage.service';
import { TooltipsModule } from 'ionic4-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImgService } from './services/img.service';
import { UsuarioService } from './services/usuario.service';
import { ComentarioService } from './services/comentario.service';
import { NotificacaoService } from './services/notificacao.service';

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
    Camera,
    ComentarioService,
    NotificacaoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
