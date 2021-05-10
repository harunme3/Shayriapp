import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavroitePageRoutingModule } from './favroite-routing.module';

import { FavroitePage } from './favroite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavroitePageRoutingModule
  ],
  declarations: [FavroitePage]
})
export class FavroitePageModule {}
