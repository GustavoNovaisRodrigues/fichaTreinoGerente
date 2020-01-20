import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ModalImageCropPage } from '../../modal-image-crop/modal-image-crop.page';

@Component({
  selector: 'app-popover-perfil',
  templateUrl: './popover-perfil.page.html',
  styleUrls: ['./popover-perfil.page.scss'],
})
export class PopoverPerfilPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController) { }

  ngOnInit() {
  }
  dismissPopover() {
    this.popoverController.dismiss()
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalImageCropPage,
      componentProps: { value: 123 }
    });

    await modal.present();

  }
}
