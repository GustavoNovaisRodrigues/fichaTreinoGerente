import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalImageCropPage } from './modal-image-crop.page';

const routes: Routes = [
  {
    path: '',
    component: ModalImageCropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalImageCropPageRoutingModule {}
