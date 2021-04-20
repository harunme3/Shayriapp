import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from '@angular/fire';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Environment
import { environment } from '../environments/environment';


import{PaginationService} from './service/\/pagination.service'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFireDatabaseModule,
    AngularFireStorageModule


  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   PaginationService

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
