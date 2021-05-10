import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavroitePage } from './favroite.page';

const routes: Routes = [
  {
    path: '',
    component: FavroitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavroitePageRoutingModule {}
