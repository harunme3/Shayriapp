import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPageRoutingModule } from './content-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContentPage } from './content.page';
import { LottieModule } from 'ngx-lottie';

import player from 'lottie-web/build/player/lottie_light';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [ContentPage],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ContentPageModule {}
