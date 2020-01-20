import { MensagensService } from './mensagens.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap, take, map, first, takeWhile, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dadosUsuarioLogado$: Observable<any | null>
  readonly _pathUsuarios = "usuarios/"
  // dataUserLogado$: BehaviorSubject<any | null> = new BehaviorSubject<any>(null)
  // private userLoaded: boolean = false
  constructor(
    private afauth: AngularFireAuth,
    private mensagensService: MensagensService,
    private afirestore: AngularFirestore) {
    console.log('[auth Iniciado]');
    this._setaDadosUsuarioLogado()
  }
  //==========================================================
  //             GETTERS
  //==========================================================
  getDadosUsuarioLogado() {
    return this.dadosUsuarioLogado$
  }






  //==========================================================
  //             MEtodos
  //==========================================================
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




  //==========================================================
  //             Metodos Privado
  //==========================================================
  private _setaDadosUsuarioLogado(): void {
    this.dadosUsuarioLogado$ = this.afauth.authState.pipe(
      switchMap(user => {
        if (user) return this.afirestore.doc<any>(`${this._pathUsuarios}${user.uid}`).valueChanges()//of(user) // Logged in       
        // else return of(null)// Logged out
      })
    )
  }
}
