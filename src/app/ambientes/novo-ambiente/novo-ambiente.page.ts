import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AmbienteDTO } from '../../models/ambiente.model';
import { AmbienteService } from '../../services/ambiente.service';

@Component({
  selector: 'app-novo-ambiente',
  templateUrl: './novo-ambiente.page.html',
  styleUrls: ['./novo-ambiente.page.scss'],
})
export class NovoAmbientePage implements OnInit {

  form: FormGroup;

  newAmbiente: AmbienteDTO = new AmbienteDTO();
  usuario: Usuario;

  constructor(private router: Router,
    private ambienteService: AmbienteService,
    private toastController: ToastController,
    private usuarioService: UsuarioService,
    private fb: FormBuilder) {
    }

  ngOnInit() {
    this.carregarData();
    this.criarFormulario();
  }

  carregarData(){
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuario = response;
    });
  }

  criarFormulario(){
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  }

  voltar(){
    this.router.navigate(["/ambientes"])
  }

  criarAmbiente(){
    this.newAmbiente = this.form.value;
    this.newAmbiente.usuarioId = this.usuario.id;

    this.ambienteService.criarAmbiente(this.newAmbiente).subscribe(response => {
      this.mostrarMensagem("Ambiente criado com sucesso!");
      this.router.navigate(["/ambientes"]);
    }, error => {
      this.mostrarMensagem("Erro ao criar ambiente!");
    })



  }

  async mostrarMensagem(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
