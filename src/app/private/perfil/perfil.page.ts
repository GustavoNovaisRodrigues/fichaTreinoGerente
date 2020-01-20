import { PopoverPerfilPage } from './popover-perfil/popover-perfil.page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Observable, fromEvent } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { PopoverController, ModalController } from '@ionic/angular';
import { ModalImageCropPage } from '../modal-image-crop/modal-image-crop.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dataUsuario: Observable<any | null>
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MensagensService,
    private popoverController: PopoverController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.dataUsuario = this.authService.getDadosUsuarioLogado()
    // this.presentPopover()
    this.presentModal()
  }
  async presentModal() {// TODO retirar posteriormente, uso somente para desenvolvimento
    const modal = await this.modalController.create({
      component: ModalImageCropPage,
      componentProps: { value: 123 }
    });

    await modal.present();

  }

  async presentPopover(ev?: any) {
    const popover = await this.popoverController.create({
      component: PopoverPerfilPage,
      event: ev,
      translucent: false
    });

    await popover.present();
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
