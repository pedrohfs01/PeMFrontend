import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.page.html',
  styleUrls: ['./ambientes.page.scss'],
})
export class AmbientesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  adicionarAmbiente(){
    this.router.navigate(["/ambientes/novo-ambiente"])
  }

  logout(){
    this.router.navigate(["/login"])
  }
}
