import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MensagensService } from '../services/mensagens.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {

  pages = [
    {
      title: 'Perfil',
      url: '/gerente/perfil'
    },
    {
      title: 'Usuarios',
      url: '/gerente/usuarios'
    },
  ]
  selectedPath = ''
  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MensagensService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    })
  }
  ngOnInit() {
  }
  async deslogar() {
    const loading = await this.messageService.apresentarLoading()
    const resposta = await this.authService.deslogar()
    this.messageService.criarMensagemEApresena(resposta.message, resposta.success, resposta.header)
    loading.dismiss()
    this._redirecionar()
  }
  //==========================================================
  //             Metodos privados
  //==========================================================
  private _redirecionar() {
    this.router.navigate(['/']);
  }
}
