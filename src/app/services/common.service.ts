import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Injectable( {
  providedIn: 'root'
} )
export class CommonService {

  constructor( public alertController: AlertController ) {
  }

  async presentAlert( title = '', subtitle = '', message = '' ) {
    const alert = await this.alertController.create( {
      header: title,
      subHeader: subtitle,
      message,
      buttons: [ 'OK' ]
    } );

    await alert.present();

    return alert;
  }
}
