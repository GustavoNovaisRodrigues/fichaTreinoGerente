import { MensagensService } from './mensagens.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private mensagensService: MensagensService) { }


  async logarUsuarioSenha(email: string, senha: string) {
    try {
      await this.afauth.auth.signInWithEmailAndPassword(email, senha)
      return this.mensagensService.criarMensagem('✅ Usuario logado com sucesso!')
    } catch (error) {
      let traducao = this.mensagensService.erroTraduzirFirebase(error)
      return this.mensagensService.criarMensagem(traducao.message, false, '❌ Erro ao logar')
    }
  }

  async deslogar() {
    try {
      await this.afauth.auth.signOut()
      return this.mensagensService.criarMensagem('✅ Usuario deslogado com sucesso!')
    } catch (error) {
      const traducao = this.mensagensService.erroTraduzirFirebase(error)
      return this.mensagensService.criarMensagem(traducao.message, false, '❌ Erro ao deslogar')
    }
  }
}
