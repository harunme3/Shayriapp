import { Tab1PageModule } from './../../tab1/tab1.module';
import { Tab1Page } from './../../tab1/tab1.page';
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
    FavroitePageRoutingModule,

  ],
  providers:[],
  declarations: [FavroitePage]
})
export class FavroitePageModule {}
