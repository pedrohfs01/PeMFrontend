import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Imagem } from './img.model';
import { ImgService } from './img.service'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fotos: Imagem[];
  img;



  constructor(private imgService: ImgService,
    private alertController: AlertController,
    private toastController: ToastController,
    private camera: Camera) { }

  ngOnInit(): void {
    this.carregarFotos();
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
      this.toastController.create({
        message: 'Erro ao tirar foto. Tente novamente.',
        duration: 2000
      })
    })
  }

  galleryPhoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/png;base64,' + imageData;
      this.adicionarFoto(this.img);
    }, (err) => {
    });
  }

  adicionarFoto(foto) {
    console.log(this.img);


    this.imgService.uploadImg(this.img).subscribe(response => {
      this.toastController.create({
        message: 'Foto salva!',
        duration: 2000
      })
      this.carregarFotos();
    }, (error) => {
      this.toastController.create({
        message: 'Erro ao fazer upload da foto. Tente novamente.',
        duration: 2000
      })
    })
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
              this.deleteMessage();
              this.carregarFotos();
            });
          }
        }

      ]
    });
    await alert.present();
  }

  async deleteMessage() {
    const toast = await this.toastController.create({
      message: 'Excluído com sucesso.',
      duration: 2000
    })
    toast.present();
  }

  carregarFotos() {
    this.imgService.findAllImage().subscribe(response => {
      this.fotos = response;

      for(let foto of response){

        console.log(foto.instante.toISOString());
      }

    })
  }
}
