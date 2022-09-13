import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, MenuController, ToastController, ViewWillEnter } from '@ionic/angular';
import { AmbienteService } from 'src/app/ambientes/ambiente.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Usuario } from 'src/app/auth/usuario.model';
import { UsuarioService } from 'src/app/auth/usuario.service';

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
    private menuController: MenuController) { }


  ionViewWillEnter(): void {
  }


  ngOnInit() {
    this.usuarioLogado = this.storageService.getLocalUser();
    this.carregarUsuarios();
    
    this.menuController.close();
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
          console.log(this.usuariosInclusos);
          console.log(this.usuarioCriador);
          console.log(this.usuarioLogado);          
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
      this.usuarioService.adicionarUsuarioEmAmbiente(this.ambienteId, usuario).subscribe(response => {
        this.carregarUsuarios();
        this.mostrarMensagem("Usuário adicionado ao ambiente!");
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
