import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MensagensService) { }

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
