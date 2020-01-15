import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  genero = [
    { title: 'Masculino', value: 'masculino' },
    { title: 'Feminino', value: 'feminino' },
    { title: 'Transgênero', value: 'transgenero' },
    { title: 'Outro', value: 'outro' },
  ]
  constructor() { }

  ngOnInit() {
  }

}
