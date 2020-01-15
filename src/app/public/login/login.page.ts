import { MensagensService, MensagemUsuario } from './../../services/mensagens.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  get email() { return this.loginForm.get('email') }
  get senha() { return this.loginForm.get('senha') }


  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public messageService: MensagensService
  ) { }

  ngOnInit() {
    this._formInit()
  }
  //==========================================================
  //             METODOS
  //==========================================================
  async logar() {
    const loading = await this.messageService.apresentarLoading()

    if (this.loginForm.invalid) return this.messageService.criarMensagemEApresena(
      'Todos os campos do formulário precisam ser preenchidos corretamente',
      false,
      '❌ Erro ao logar'
    )
    const respostaLogin = await this.authService.logarUsuarioSenha(this.email.value, this.senha.value)
    await loading.dismiss()
    this.messageService.apresentarMensagem(respostaLogin)
    this._redirecionarUsuarioLogado()


  }




  //==========================================================
  //             METODOS PRIVADOS
  //==========================================================
  private _formInit() {
    const campos = {
      email: ['gerente@email.com', [
        Validators.required,
        Validators.email
      ]],
      senha: ['123456', [
        Validators.required,
        Validators.minLength(6)
      ]],
    }
    this.loginForm = this.formBuilder.group(campos)
  }




  private _redirecionarUsuarioLogado() {
    this.router.navigate(['/perfil'])
  }

}
