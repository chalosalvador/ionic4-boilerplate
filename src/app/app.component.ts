import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { CommonService } from './services/common.service';

@Component( {
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
} )
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then( async () => {
      this.statusBar.styleDefault();

      // Handle the logic here after opening the app with the Dynamic link
      this.firebaseDynamicLinks.onDynamicLink()
        .subscribe( async ( res: any ) => {
          console.log( 'DynamicLink', res );
          try {
            await this.authService.signInWithEmailLink( res.deepLink );
            console.log( 'LoggedIn' );
            await this.navController.navigateRoot( [ 'home/tabs/tab1' ] );
          } catch ( e ) {
            await this.commonService.presentAlert('Login', '', 'Hubo un error al iniciar sesión.');
          }

        }, ( error: any ) => console.log( 'DynamicLink ERROR', error ) );


      this.authService.authState()
        .subscribe(async ( user ) => {
          if ( user ) {
            console.log( 'LoggedIn', user );
            await this.navController.navigateRoot( [ 'home/tabs/tab1' ] );
            this.splashScreen.hide();
          } else {
            console.log( 'NO LoggedIn' );
            await this.navController.navigateRoot( [ 'login' ] );
            this.splashScreen.hide();
          }
        });

    } );
  }
}
