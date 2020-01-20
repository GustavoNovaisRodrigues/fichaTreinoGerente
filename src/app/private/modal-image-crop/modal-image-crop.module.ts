import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalImageCropPageRoutingModule } from './modal-image-crop-routing.module';

import { ModalImageCropPage } from './modal-image-crop.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalImageCropPageRoutingModule,
  ],
  declarations: [ModalImageCropPage]
})
export class ModalImageCropPageModule { }
