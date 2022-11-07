import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit, ViewWillEnter {

  form: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private fb: FormBuilder) {
      this.criarFormularioSenha();

  }

  ionViewWillEnter(): void {
    this.criarFormularioSenha();
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuario = response;
    })
  }

  ngOnInit() {
  }

  criarFormularioSenha() {
    this.form = this.fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(5)]],
      novaSenha: ['', [Validators.required, Validators.minLength(5), this.patternValidator()]]
    });
  }

  alterarSenha() {
    this.usuarioService.alterarSenha({
      login: this.usuario.login,
      novaSenha: this.form.controls['novaSenha']?.value,
      senhaAtual: this.form.controls['senhaAtual'].value
    })
      .subscribe(r => {
        this.mostrarMensagem("Senha alterada com sucesso.");
        this.voltar();
      }, (error) => {
        this.mostrarMensagem("Erro ao tentar alterar a senha, verifique a senha atual.");
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
    this.router.navigate(["/ambientes"]);
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
