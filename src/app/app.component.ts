import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private oneSignal: OneSignal,
    private androidPermissions:AndroidPermissions,)
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




}
