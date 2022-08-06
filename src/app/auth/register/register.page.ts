import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private fb: FormBuilder) {
      this.criarFormularioUsuario();

  }

  ngOnInit() {
  }

  criarFormularioUsuario(){
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  cadastrar() {
    this.usuario = this.form.value;
    this.usuarioService.registrar(this.usuario).subscribe(response => {
      this.mostrarMensagem("Registro efetuado com sucesso.");
      this.router.navigate(["/login"]);
    }, (error) => {
      this.mostrarMensagem("Erro ao tentar registrar.");
    });

  }

  async mostrarMensagem(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(["/login"]);
  }
}
