import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

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

  criarFormularioUsuario() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(5), this.patternValidator()]]
    });
  }

  cadastrar() {
    this.usuario = this.form.value;
    this.usuarioService.findByLogin(this.usuario.login).subscribe(r => {
      if (r === null || r === undefined) {
        this.usuarioService.registrar(this.usuario).subscribe(response => {
          this.mostrarMensagem("Registro efetuado com sucesso.");
          this.router.navigate(["/login"]);
        }, (error) => {
          this.mostrarMensagem("Erro ao tentar registrar.");
        });
      }else{
        this.mostrarMensagem("Já existe um usuário com esse login.");
      }
    })
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(["/login"]);
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
