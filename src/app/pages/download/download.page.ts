import { ShowmediaPage } from './../showmedia/showmedia.page';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage{


  constructor(

    private modalController: ModalController,
    public paginationService:PaginationService,
    private toastController: ToastController,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,

  ) {


  }



ngOnInit()
{

this.paginationService.fetchdownloadedcard();

}



async Showmedia(image,index) {

  if (!this.paginationService.ismodalopen) {
    this.paginationService.ismodalopen = true;
  const modal = await this.modalController.create({
  component: ShowmediaPage,
  componentProps: {
    url: image.imageview,
    index:index,
    nativeurl:image.nativeurl

   }
  });

  await modal.present();
}

}









  closeModal() {

    this.paginationService.ismodalopen=false;
   this.modalController.dismiss();



 }
}
