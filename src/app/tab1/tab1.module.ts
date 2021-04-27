import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

import player from 'lottie-web/build/player/lottie_light';

export function playerFactory() {
  return player;
}


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [Tab1Page],

 schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Tab1PageModule {}
