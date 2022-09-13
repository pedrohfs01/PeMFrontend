import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CredenciaisDTO } from '../../models/usuario.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: CredenciaisDTO = new CredenciaisDTO();

  form: FormGroup;

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private storageService: StorageService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.criarFormularioLogin();
  }


  criarFormularioLogin(){
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  login(){
    this.usuario = this.form.value;

    this.usuarioService.login(this.usuario).subscribe(response => {
      this.mostrarMensagem("Login efetuado com sucesso!");
      this.storageService.setLocalUser(this.usuario);
      this.router.navigate(["/ambientes"]);
    }, (error) => {
      this.mostrarMensagem("Dados inválidos, tente novamente.");
    })
  }

  async mostrarMensagem(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  registrar(){
    this.router.navigate(["/register"])
  }
}
