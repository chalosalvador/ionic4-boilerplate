Este proyecto sirve como base para empezar a trabajar con Ionic 4 y Firebase.

Brinda funcionalidad base de autenticación passwordless y una estructura de la aplicación mediante tabs.

Para empezar a usarlo se debe realizar todas las siguientes configuraciones:

Incluir los archivos de configuración de los ambientes dentro de `src/environments`, se 
deben incluir al menos dos ambientes: 
 * `src/environments/environment.prod.ts` 
 * `src/environments/environment.ts` (desarrollo)
 
Para configurar los dos ambientes de trabajo se deberán crear dos proyectos en Firebase.

El contenido de estos arhivos debe basarse en el `environment.model.ts` y deben verse así:
```javascript
import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  production: false, // or true
  firebase: {
    apiKey: 'AIzaSyA3Ev4VYgSdyd6rx0XXXXXXXXXXXXXXX',
    authDomain: 'XXXXXXXXXXXX.firebaseapp.com',
    databaseURL: 'https://XXXXXXXXXXXX.firebaseio.com',
    projectId: 'XXXXXXXXXXXX',
    storageBucket: 'XXXXXXXXXXXX.appspot.com',
    messagingSenderId: '0000000000000000000',
    appId: '1:000000000000000:web:qwenqwejkqjweqjkwej',
    measurementId: 'G-MSISOENSNSJ'
  },
  dynamicLinks: {
    bundleId: 'com.grupomenta.ionic4boilerplate', // reemplazar por el correspondiente
    packageName: 'com.grupomenta.ionic4boilerplate', // reemplazar por el correspondiente
    dynamicLinkDomain: 'https://example.page.link'  // reemplazar por el correspondiente
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

``` 

Además, se debe incluir los archivos `google-services.dev.json` y `GoogleService-Info.dev.plist` 
(https://support.google.com/firebase/answer/7015592?hl=es) en `src/environments/google_services`. Estos son necesarios 
para permitir el uso del inicio de sesión passwordless. 
También se deberá configurar los dynamic links en los proyectos de Firebase: https://firebase.google.com/docs/dynamic-links
 
En el archivo `package.json` en las líneas 17 y 18 cambiar `[NOMBRE-PROYECTO-FIREBASE]` por el nombre del proyecto de 
firebase que corresponda. De igual manera en las líneas 100 y 101.  
