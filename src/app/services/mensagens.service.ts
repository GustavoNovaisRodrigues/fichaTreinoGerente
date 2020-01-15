import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

export interface MensagemUsuario {
  success: boolean,
  message: string,
  header: string
}
export interface ErrorFirebase {
  code: string,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController) { }






  //==========================================================
  //             METODOS
  //==========================================================
  async apresentarLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      // duration: 2000,
      spinner: 'crescent',//"bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      cssClass: 'loading',
    });
    await loading.present();
    return loading
  }



  apresentarMensagem(mensagemUsuario: MensagemUsuario) {
    if (mensagemUsuario.success) this._presentToast(mensagemUsuario)
    if (!mensagemUsuario.success) this._presentAlert(mensagemUsuario)
  }



  criarMensagemEApresena(message: string, success = true, header?: string): void {
    const resposta: MensagemUsuario = {
      success,
      message,
      header
    }
    this.apresentarMensagem(resposta)
  }



  erroTraduzirFirebase(error: ErrorFirebase): ErrorFirebase {
    let mensagem = this._traducao().filter(data => (data.code === error.code))
    if (mensagem.length < 1) return error
    return mensagem[0]
  }






  //==========================================================
  //             CREATERS
  //==========================================================
  criarMensagem(message: string, success = true, header?: string): MensagemUsuario {
    const resposta: MensagemUsuario = {
      success,
      message,
      header
    }
    return resposta
  }






  //==========================================================
  //             METODOS PRIVADOS
  //==========================================================
  private async _presentToast(mensagemUsuario: MensagemUsuario) {
    const toast = await this.toastController.create({
      message: mensagemUsuario.message,
      duration: 2000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '❌'
    });
    await toast.present();
  }



  private async _presentAlert(mensagemUsuario: MensagemUsuario) {
    const alert = await this.alertController.create({
      header: mensagemUsuario.header,
      // subHeader: 'Erro ao enviar dados!',
      message: mensagemUsuario.message,
      buttons: ['OK']
    });
    await alert.present();
  }



  private _traducao(): Array<ErrorFirebase> {
    return [
      {//  signInWithEmailAndPassword()
        code: 'auth/invalid-email',
        message: 'Endereço de e-mail não é válido'
      },
      {
        code: 'auth/user-disabled',
        message: 'Este usuário está desativado.'
      },
      {
        code: 'auth/user-not-found',
        message: 'Este e-mail não está cadastrado.'
      },
      {
        code: 'auth/wrong-password',
        message: 'Senha incorreta.'
      },


      {//createUserWithEmailAndPassword()
        code: 'auth/email-already-in-use',
        message: 'Este e-mail já está sendo usado.'
      },
      {
        code: 'auth/operation-not-allowed',
        message: 'A conta não pode ser ativada.'
      },
      {
        code: 'auth/weak-password',
        message: 'A senha não é forte o suficiente. Mínimo de 6 caracteres'
      },


      {//updateEmail90
        code: 'auth/invalid-email',
        message: 'Desculpe mas este E-mail não é um e-mail valido.'
      },
      {
        code: 'auth/requires-recent-login',
        message: 'Esta operação é sensível e requer autenticação recente. Efetue login novamente antes de tentar de novo.'
      },
    ]
  }

}
