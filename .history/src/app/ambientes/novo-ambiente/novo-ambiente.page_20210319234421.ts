import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-ambiente',
  templateUrl: './novo-ambiente.page.html',
  styleUrls: ['./novo-ambiente.page.scss'],
})
export class NovoAmbientePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar(){
    this.router.navigate(["/ambientes"])
  }

  criarAmbiente(){

  }

}
