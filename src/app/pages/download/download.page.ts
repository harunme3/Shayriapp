import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage{



  constructor(

    private modalController: ModalController,

    private toastController: ToastController,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,

  ) {


  }

















  closeModal() {


   this.modalController.dismiss();



 }
}
