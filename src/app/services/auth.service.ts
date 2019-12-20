import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor( public afAuth: AngularFireAuth ) {
  }

  public getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  public authState() {
    return this.afAuth.authState;
  }

  login( email ) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://' + environment.firebase.authDomain,
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: environment.dynamicLinks.bundleId
      },
      android: {
        packageName: environment.dynamicLinks.packageName,
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: environment.dynamicLinks.dynamicLinkDomain
    };

    return this.afAuth.auth.sendSignInLinkToEmail( email, actionCodeSettings )
      .then( () => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        localStorage.setItem( 'emailForSignIn', email );
      } );
  }

  isSignInWithEmailLink() {
    // Confirm the link is a sign-in with email link.
    return this.afAuth.auth.isSignInWithEmailLink( window.location.href );
  }

  async signInWithEmailLink( deepLink ) {
    if ( !this.getCurrentUser() ) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.

      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = localStorage.getItem( 'emailForSignIn' );
      if ( !email ) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt( 'Ingresa el correo electrónico con el que deseas iniciar sesión:' );
      }

      try {
        // The client SDK will parse the code from the link for you.
        const result = await this.afAuth.auth.signInWithEmailLink( email, deepLink );
        // Clear email from storage.
        localStorage.removeItem( 'emailForSignIn' );

        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        console.log( 'result', result );
        console.log( 'result.additionalUserInfo.profile', result.additionalUserInfo.profile );
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        console.log( 'result.additionalUserInfo.isNewUser', result.additionalUserInfo.isNewUser );

      } catch ( error ) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.log( 'error', error );
        throw error;
      }
    } else {
      console.log( 'error Already loggedin', this.getCurrentUser() );
      throw new Error('error Already loggedin');
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
