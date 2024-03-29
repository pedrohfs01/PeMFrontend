import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CredenciaisDTO } from '../../models/usuario.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {

  usuario: CredenciaisDTO = new CredenciaisDTO();

  form: FormGroup;

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private storageService: StorageService,
    private fb: FormBuilder) { }


  ionViewWillEnter(): void {
    this.criarFormularioLogin();
  }

  ngOnInit() {
    this.criarFormularioLogin();
  }


  criarFormularioLogin(){
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login(){
    this.usuario = this.form.value;

    this.usuarioService.login(this.usuario).subscribe(response => {
      this.mostrarMensagem("Sucesso ao logar.");
      this.usuario.senha = null;
      this.storageService.setLocalUser(this.usuario);
      this.router.navigate(["/ambientes"]);
    }, (error) => {
      this.mostrarMensagem("Dados incorretos.");
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
  
  esqueciSenha(){
   if(this.form.controls['login']?.errors?.required == true){
    return this.mostrarMensagem("Para recuperar a senha precisa ser inserido um login.");
   }
   this.usuarioService.esqueciMinhaSenha(this.form.controls['login']?.value)
        .subscribe(response => {
          this.mostrarMensagem("Nova senha foi enviada via e-mail, caso exista uma conta com este login.")
        });
  }
}
