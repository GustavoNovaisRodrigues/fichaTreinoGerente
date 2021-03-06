import { ModalImageCropPageModule } from './../../modal-image-crop/modal-image-crop.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverPerfilPageRoutingModule } from './popover-perfil-routing.module';

import { PopoverPerfilPage } from './popover-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverPerfilPageRoutingModule,
    ModalImageCropPageModule
  ],
  declarations: [PopoverPerfilPage]
})
export class PopoverPerfilPageModule {}
