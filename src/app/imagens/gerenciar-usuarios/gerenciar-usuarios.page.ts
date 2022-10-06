import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, MenuController, ToastController, ViewWillEnter } from '@ionic/angular';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { NotificacaoDTO, TipoNotificacao } from 'src/app/models/notificacao.model';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.page.html',
  styleUrls: ['./gerenciar-usuarios.page.scss'],
})
export class GerenciarUsuariosPage implements OnInit, ViewWillEnter {

  ambienteId: number;
  usuarios: Usuario[] = [];
  usuarioCriador: Usuario;
  usuariosInclusos: Usuario[] = [];

  usuarioLogado: Usuario;

  @ViewChild(IonSearchbar) ionSearchBarComponent: IonSearchbar;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ambienteService: AmbienteService,
    private usuarioService: UsuarioService,
    private storageService: StorageService,
    private toastController: ToastController,
    private notificacaoService: NotificacaoService,
    private menuController: MenuController) { }


  ionViewWillEnter(): void {
    this.carregarUsuarioLogado();
    this.carregarUsuarios();
    this.menuController.close();
  }

  ngOnInit() {
  }
  
  carregarUsuarioLogado() {
    this.usuarioService.getUsuarioLogado().subscribe(r => {
      this.usuarioLogado = r;
    })
  }

  carregarUsuarios(){
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ambienteId = params['id'];
        this.ambienteService.getById(this.ambienteId).subscribe(response => {
          this.usuarios = [];
          this.usuariosInclusos = response.usuarios;
          this.usuarioCriador = response.criador;
          if(this.ionSearchBarComponent?.value != undefined){
            this.ionSearchBarComponent.value = "";
          }       
        })
      }
    })
  }


  search(event) {
    this.usuarios = [];
    if(event.detail.value == ""){
      return this.carregarUsuarios();
    }
    this.usuarioService.findByNome(event.detail.value).subscribe(response => {
      if(response?.length > 0){
        this.usuarios = response.filter(usuario => this.usuariosInclusos.find(usuarioIncluso => usuario.id === usuarioIncluso.id) === undefined)
      }
    })
  }

  deletarUsuario(usuario: Usuario){
    if(usuario.id != null){
      this.usuarioService.removerUsuarioEmAmbiente(this.ambienteId, usuario).subscribe(response => {
        this.carregarUsuarios();
        this.mostrarMensagem("Usuário removido do ambiente!");
      })
    }
  }

  adicionarUsuario(usuario: Usuario){
    if(usuario.id != null){
      let notificacao: NotificacaoDTO = new NotificacaoDTO();
      notificacao.aceitavel = true;
      notificacao.criadorId = this.usuarioLogado.id;
      notificacao.usuarioNotificadoId = usuario.id;
      notificacao.idObjeto = this.ambienteId;
      notificacao.tipoNotificacao = TipoNotificacao.CONVITE;
      notificacao.descricao = "O usuário "+this.usuarioLogado.nome+" te convidou para um ambiente, deseja aceitar? ";

      this.notificacaoService.verificarSeExisteNotificacao(notificacao).subscribe(response => {
        if(response == true){
          this.mostrarMensagem("O usuário já foi convidado anteriormente para este ambiente.");
        }else{
          this.notificacaoService.salvar(notificacao).subscribe(() => {
            this.mostrarMensagem("Solicitação ao usuário enviada com sucesso.");
            this.carregarUsuarios();
          })
        }
      })
    }
  }

  limparCampo(event){
    event.target.value = "";
  }

  voltar() {
    this.router.navigate(["/imagens", this.ambienteId]);
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
