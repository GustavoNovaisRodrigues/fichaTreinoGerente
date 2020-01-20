import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivatePage } from './private.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/gerente/perfil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PrivatePage,
    children: [{
      path: 'perfil',
      loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
    },
    {
      path: 'usuarios',
      loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListPageModule)
    }]
  },
  {
    path: 'modal-image-crop',
    loadChildren: () => import('./modal-image-crop/modal-image-crop.module').then( m => m.ModalImageCropPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePageRoutingModule { }
