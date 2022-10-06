import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ViewWillEnter } from '@ionic/angular';

import { Ambiente } from '../models/ambiente.model';
import { TipoNotificacao } from '../models/notificacao.model';
import { Usuario } from '../models/usuario.model';
import { AmbienteService } from '../services/ambiente.service';
import { ImgService } from '../services/img.service';
import { NotificacaoService } from '../services/notificacao.service';
import { UsuarioService } from '../services/usuario.service';
import { NotificacoesModalComponent } from './notificacoes-modal/notificacoes-modal.component';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.page.html',
  styleUrls: ['./ambientes.page.scss'],
})
export class AmbientesPage implements OnInit, ViewWillEnter {

  ambientes: Ambiente[] = [];

  usuario: Usuario;

  isModalNotificacaoOpen: boolean = false;

  constructor(private router: Router,
    private ambienteService: AmbienteService,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private imagemService: ImgService,
    public modalController: ModalController,
    private notificacaoService: NotificacaoService,
  ) { }
  ionViewWillEnter(): void {
    this.carregarDados();
  }

  ngOnInit() {
  }

  carregarDados() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuario = response;
      this.ambienteService.findAllAmbienteByUsuario(this.usuario.id).subscribe(
        response => {
          this.ambientes = response;
        })


      this.notificacaoService.findAllByUsuario(this.usuario.id).subscribe(response => {
        this.usuario.notificacoes = response;
        this.usuario?.notificacoes?.forEach(notificacao => {
          if(notificacao?.tipoNotificacao === TipoNotificacao.DENUNCIA){
            this.imagemService.findImageById(notificacao.idObjeto).subscribe(response => {
              notificacao.imagem = response;
            })
          }
        })
      })
    })

  }

  adicionarAmbiente() {
    this.router.navigate(["/ambientes/novo-ambiente"])
  }

  logout() {
    this.usuarioService.logout();
  }

  irAmbiente(id: number) {
    this.router.navigate(["/imagens", id])
  }

  refresh() {
    this.carregarDados();
  }

  abrirNotificacoes() {
    if(this.getQuantidadeNotificacao() > 0){
      this.openModal();
    }else{
      this.mostrarMensagem("Não há notificações para serem abertas.");
    }
  }

  getQuantidadeNotificacao(){
    return this.usuario?.notificacoes?.length;
  }

  async mostrarMensagem(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async openModal() {
    
    const modal = await this.modalController.create({
      component: NotificacoesModalComponent,
      componentProps: {
        notificacoes: this.usuario.notificacoes
      }
    });

    modal.onDidDismiss().then(() => {
      this.carregarDados();
    });

    return await modal.present();
  }
}
