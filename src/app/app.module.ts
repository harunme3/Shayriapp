import { Injectable, NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import{PaginationService} from './service/\/pagination.service'
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import{File} from '@ionic-native/file/ngx'
import{AndroidPermissions} from '@ionic-native/android-permissions/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { BrowserModule,HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DualDirective } from './directive/dual.directive';
import { ColorPickerService } from 'ngx-color-picker';



@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
      // I will only use the swap gesture so
      // I will deactivate the others to avoid overlaps
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}


@NgModule({
  declarations: [AppComponent, DualDirective],
  entryComponents: [],
  imports: [BrowserModule,HammerModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    RouterModule,



  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
   PaginationService,
   OneSignal,
   Base64ToGallery,
   File,
   AndroidPermissions,
   SocialSharing,
   ImagePicker,
   Clipboard,
   NativeStorage,
   Platform,
   ColorPickerService,



  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
