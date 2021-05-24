import { AboutPage } from './pages/about/about.page';
import { SettingPage } from './pages/setting/setting.page';
import { PaginationService } from 'src/app/service/pagination.service';
import { FavroitePage } from './pages/favroite/favroite.page';
import { DownloadPage } from './pages/download/download.page';
import { EditorPage } from './pages/editor/editor.page';
import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ModalController } from '@ionic/angular';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private oneSignal: OneSignal,
    private androidPermissions:AndroidPermissions,
    private modalController: ModalController,
   private renderer:Renderer2,
   public paginationService:PaginationService
    )
  {
    this.initializeApp();
  }

  initializeApp() {




    this.oneSignal.startInit('2d7274aa-9179-4605-a5ed-403315e6eaa8', '589803760372');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();





this.permission();

  }

  permission()

{
  let list: string[] = [
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  ];

  this.androidPermissions
    .checkPermission(
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
    )
    .then((res) => {
      console.log("permission garnteed")
       if(!res.hasPermission)
       {
        this.androidPermissions.requestPermissions(list);

       }//

    },err=>{
      console.log("no permission error")
      this.androidPermissions.requestPermissions(list);

    });
}


@ViewChild('list') list:ElementRef

//open modol c

async openEditorPage()
{
  console.log('this.list :>> ', this.list);
 //this.renderer.addClass()
  const modal = await this.modalController.create({
  component:EditorPage,
  });

  await modal.present();
}



async openFavroitePage()
{

  const modal = await this.modalController.create({
  component: FavroitePage,
  });

  await modal.present();
}

async openDownloadPage()
{

  const modal = await this.modalController.create({
  component:DownloadPage,
  });

  await modal.present();
}
async openAboutPage()
{

  const modal = await this.modalController.create({
  component:AboutPage,
  });

  await modal.present();
}

async openSettingPage()
{

  const modal = await this.modalController.create({
  component:SettingPage,
  });

  await modal.present();
}




}
