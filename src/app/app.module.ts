import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

@NgModule( {
  declarations: [ AppComponent ],
  entryComponents: [],
  imports: [ BrowserModule,
             IonicModule.forRoot(),
             AppRoutingModule,
             AngularFireModule.initializeApp( environment.firebase ),
             // imports firebase/firestore, only needed for database features.
             // enablePersistence allows offline data (https://github.com/angular/angularfire/blob/master/docs/firestore/offline-data.md)
             AngularFirestoreModule.enablePersistence(),
             AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
             AngularFireFunctionsModule, // firebase cloud functions
             AngularFireMessagingModule // notifications,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseDynamicLinks
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
