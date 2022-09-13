import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, MenuController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Ambiente } from '../models/ambiente.model';
import { Comentario, ComentarioSalvarDTO } from '../models/comentario.model';
import { Imagem, ImagemDTO } from '../models/img.model';
import { Usuario } from '../models/usuario.model';
import { AmbienteService } from '../services/ambiente.service';
import { ComentarioService } from '../services/comentario.service';
import { ImgService } from '../services/img.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-imagens',
  templateUrl: 'imagens.page.html',
  styleUrls: ['imagens.page.scss'],
})
export class ImagensPage implements OnInit, ViewWillEnter {

  fotos: Imagem[];
  img;
  imagemUpload: ImagemDTO = new ImagemDTO();

  ambienteId: number;
  usuario: Usuario;
  ambiente: Ambiente;

  novoComentario: ComentarioSalvarDTO = new ComentarioSalvarDTO();

  constructor(private imgService: ImgService,
    private alertController: AlertController,
    private toastController: ToastController,
    private usuarioService: UsuarioService,
    private ambienteService: AmbienteService,
    private comentarioService: ComentarioService,
    private camera: Camera,
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ionViewWillEnter(): void {
    this.carregarFotos();
    this.carregarDados();
  }

  ngOnInit(): void {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/png;base64,' + imageData;
      this.adicionarFoto(this.img);
    }, (err) => {
      this.mostrarMensagem("Erro ao tirar foto. Tente novamente.")
    })
  }

  galleryPhoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,

    }
    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/png;base64,' + imageData;
      this.adicionarFoto(this.img);
    }, (err) => {
      this.mostrarMensagem("Erro ao tirar foto. Tente novamente.")
    });
  }

  async adicionarFoto(foto) {
    let alert = await this.alertController.create({
      header: "Legenda",
      message: "Digite uma legenda para a foto:",
      inputs: [{
        name: 'legenda',
        placeholder: 'Legenda'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: "Adicionar",
        handler: data => {
          this.imagemUpload.legenda = data.legenda;
          this.imagemUpload.ambienteId = this.ambienteId;
          this.imagemUpload.autorId = this.usuario.id;
          this.imgService.uploadImg(this.img, this.imagemUpload).subscribe(response => {
            this.mostrarMensagem("Imagem salva com sucesso!");
          }, (error) => {
            this.mostrarMensagem("Erro ao fazer upload foto. Tente novamente.")
          }, () => {
            this.carregarFotos();
          })
        }
      }]

    })
    await alert.present();
  }

  async removerFoto(id: number) {
    let alert = await this.alertController.create({
      header: "Confirmar",
      message: "Confirma a exclusão da imagem?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: "Confirmar",
          handler: () => {
            this.imgService.deleteImage(id).subscribe(response => {
              this.mostrarMensagem("Imagem deletada com sucesso!");
            }, () => {},
            () => {
              this.carregarFotos();
            });
          }
        }

      ]
    });
    await alert.present();
  }

  carregarFotos() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ambienteId = params['id'];
        this.imgService.findAllImageByAmbiente(params['id']).subscribe(response => {
          this.fotos = response;
        })
      }
    })
  }

  async excluirAmbiente() {
    let alert = await this.alertController.create({
      header: "Confirmar",
      message: "Confirma a exclusão do ambiente?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: "Confirmar",
          handler: () => {
            this.ambienteService.deleteById(this.ambiente.id).subscribe(response => {
              this.mostrarMensagem("Deletado com sucesso!")
              this.voltarAmbiente();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  voltarAmbiente() {
    this.router.navigate(["/ambientes"]);
    this.menu.close();
  }

  gerenciarPessoas() {
    this.router.navigate(["/imagens", this.ambienteId, "gerenciar-usuarios"]);
  }

  carregarDados() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuario = response;
    })
    this.ambienteService.getById(this.ambienteId).subscribe(response => {
      this.ambiente = response;
    })
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  mostrarComentarios(img: Imagem){
    img.showComments = img.showComments == undefined ? true : !img.showComments;
    this.novoComentario = new ComentarioSalvarDTO();
  }

  adicionarComentarioImagem(img: Imagem){
    if(this.novoComentario && this.novoComentario.comentario && this.novoComentario.comentario.length > 5){
      this.novoComentario.autorId = this.usuario.id;
      this.novoComentario.imagemId = img.id;
      this.comentarioService.salvar(this.novoComentario).subscribe(comentario => {
        this.mostrarMensagem("Comentário enviado com sucesso.");
        this.novoComentario = new ComentarioSalvarDTO();
        img.showComments = true;
      }, () => {}, 
      () => {
        this.carregarFotos();
      })
    }else{
      this.mostrarMensagem("Comentário inválido. Escreva um comentário com mais de 5 caracteres.");
    }    
  }

  async deletarComentario(comentario: Comentario){
    let alert = await this.alertController.create({
      header: "Confirmar",
      message: "Confirma a exclusão do comentário?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: "Confirmar",
          handler: () => {
            this.comentarioService.deleteById(comentario.id).subscribe(response => {
              this.mostrarMensagem("Deletado com sucesso!");
            }, () => {},
            () => {
              this.carregarFotos();
            });
          }
        }

      ]
    });
    await alert.present();
  }
}
