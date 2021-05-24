import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {

    this.modalController.dismiss();

  }

}
