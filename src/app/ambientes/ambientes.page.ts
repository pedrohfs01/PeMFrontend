import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Ambiente } from '../models/ambiente.model';
import { Usuario } from '../models/usuario.model';
import { AmbienteService } from '../services/ambiente.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.page.html',
  styleUrls: ['./ambientes.page.scss'],
})
export class AmbientesPage implements OnInit, ViewWillEnter{

  ambientes: Ambiente[] = [];

  usuario: Usuario;

  constructor(private router: Router,
    private ambienteService: AmbienteService,
    private usuarioService: UsuarioService,
  ) { }
  ionViewWillEnter(): void {
    this.carregarDados();
  }

  ngOnInit() {
  }

  carregarDados() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuario = response;
      this.ambienteService.findAllAmbienteByUsuario(this.usuario.id).subscribe(
        response => {
          this.ambientes = response;
        })
    })
  }

  adicionarAmbiente() {
    this.router.navigate(["/ambientes/novo-ambiente"])
  }

  logout() {
    this.usuarioService.logout();
  }

  irAmbiente(id: number) {
    this.router.navigate(["/imagens", id])
  }

  refresh() {
    this.carregarDados();
  }
}
