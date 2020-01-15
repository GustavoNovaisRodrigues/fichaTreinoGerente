import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  links = [
    { title: 'Cadastrar usuario', url: '/cadastro' },
    { title: 'Logar usuario', url: '/login' },
  ]
  constructor() { }

  ngOnInit() {
  }

}
