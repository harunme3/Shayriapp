import { File } from '@ionic-native/file/ngx';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PaginationService } from 'src/app/service/pagination.service';
@Component({
  selector: 'app-showmedia',
  templateUrl: './showmedia.page.html',
  styleUrls: ['./showmedia.page.scss'],
})
export class ShowmediaPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private paginationService:PaginationService,
    private toastController: ToastController,
    private file:File
    ) { }


  @Input() url: string;
  @Input() index: string;
  @Input() nativeurl: string;


  ngOnInit() {
  }

  closeModal() {

    this.modalController.dismiss();


}

zoomoption={
  zoom:true,
  passiveListeners: false,
}

repost()
{

  console.log('object :>> ', this.nativeurl);
  this.socialSharing.shareViaWhatsApp(null,this.nativeurl,null).then(() => {
    // Success!
  }).catch(() => {
    // Error!
  });
}


async shareviaoption()
{
   this.socialSharing.share(null,null,this.nativeurl,null)
}






















private win: any = window;

getimagesrc(urls)
{

  let path = this.win.Ionic.WebView.convertFileSrc(urls);
  return path;

}


async deletesaved()
{

const path=this.url.substring(0,this.url.lastIndexOf('/')+1);
const filename=this.url.substring(this.url.lastIndexOf('/')+1)




this.paginationService.downloadeddata.splice(this.index,1);

this.file.removeFile(this.file.externalRootDirectory+'TRVShayari',filename);





   this.modalController.dismiss();
   const toast = await this.toastController.create({
     message: 'Your status have been deleted',
     duration: 500,
     position:'middle',
     color:"primary",
     mode:'ios',
   });
   toast.present();


   }





}
