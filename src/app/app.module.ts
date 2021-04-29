import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
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



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,


  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   PaginationService,
   OneSignal,
   Base64ToGallery,
   File,
   AndroidPermissions,
   SocialSharing,
   ImagePicker


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
