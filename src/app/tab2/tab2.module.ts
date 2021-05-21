import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LottieModule } from 'ngx-lottie';


import player from 'lottie-web/build/player/lottie_light';

export function playerFactory() {
  return player;
}

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [Tab2Page],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2PageModule {}
