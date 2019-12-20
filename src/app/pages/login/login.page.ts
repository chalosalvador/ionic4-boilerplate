import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component( {
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [ './login.page.scss' ]
} )
export class LoginPage implements OnInit {

  constructor( private authService: AuthService, public commonService: CommonService ) {
  }

  ngOnInit() {
  }

  async doLogin( form: NgForm ) {
    try {
      await this.authService.login( form.value.email );
      await this.commonService.presentAlert( 'Inicio de sesión', 'Te hemos enviado un correo, revisa tu bandeja de entrada.' );
      // this.emailSent = true;
    } catch ( e ) {
      console.error( e );
      await this.commonService.presentAlert( 'Error', 'No se pudo enviar el correo electrónico de inicio de sesión.' );
      // this.errorMessage = e.message;
    }
  }

}
