import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPage } from './editor.page';
import { ColorPickerModule } from 'ngx-color-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPickerModule


  ],
  declarations: [EditorPage]
})
export class EditorPageModule {}
