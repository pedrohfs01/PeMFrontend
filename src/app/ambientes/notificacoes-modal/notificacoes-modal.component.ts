import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, ViewWillEnter } from '@ionic/angular';
import { Notificacao, TipoNotificacao } from 'src/app/models/notificacao.model';
import { ImgService } from 'src/app/services/img.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-notificacoes-modal',
  templateUrl: './notificacoes-modal.component.html',
  styleUrls: ['./notificacoes-modal.component.scss'],
})
export class NotificacoesModalComponent implements OnInit, ViewWillEnter {

  notificacoes: Notificacao[] = [];

  constructor(private modalController: ModalController,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private imgService: ImgService,
    private toastController: ToastController,
    private navParams: NavParams) { }


  ionViewWillEnter(): void {
    this.notificacoes = this.navParams.data.notificacoes;
  }

  ngOnInit() {

  }

  async fecharModalNotificacao() {
    await this.modalController.dismiss();
  }


  aceitar(notificacao: Notificacao) {
    console.log(notificacao);

    if (notificacao.tipoNotificacao == TipoNotificacao.CONVITE) {
      this.usuarioService.adicionarUsuarioEmAmbiente(notificacao.idObjeto, notificacao.usuarioNotificado).subscribe(r => {
        this.mostrarMensagem("Entrou no ambiente com sucesso!");
      })
    } else if (notificacao.tipoNotificacao == TipoNotificacao.DENUNCIA) {
      this.imgService.deleteImage(notificacao.idObjeto).subscribe(() => {
        this.mostrarMensagem("Excluiu a imagem com sucesso!");
      })
    }

    this.deletarNotificacao(notificacao.id);
  }

  recusar(notificacao: Notificacao) {
    if (notificacao.tipoNotificacao == TipoNotificacao.CONVITE) {
      this.mostrarMensagem("Recusou a entrada no ambiente com sucesso!");
    }

    this.deletarNotificacao(notificacao.id);
  }

  deletarNotificacao(id: number) {
    this.notificacaoService.delete(id).subscribe(() => {
      this.fecharModalNotificacao();
    });
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
