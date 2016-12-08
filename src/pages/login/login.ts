import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { CLIENT_ID, DOMAIN } from '../../config/auth0.ts';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  lock = new Auth0Lock(CLIENT_ID, DOMAIN, {
    autoclose: true,
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      }
    },
    container: 'hiw-login-container',
    languageDictionary: {
      title: "Meezan"
    },
    theme: {
      logo: 'http://meezanapp.azurewebsites.net/assets/logo.png',
      primaryColor: 'black'
    }
  });

  constructor(public navCtrl: NavController, public auth: AuthService) { }

  ionViewDidLoad() {
    console.log('Login Page: Loaded');

    // Set up callback for processing after login completion
    this.lock.on('authenticated', authResult => {
      // persist login state
      this.auth.setLogin(authResult);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        // persist profile state
        this.auth.setProfile(profile);
        // Navigate to home page (set root so that no back button is displayed)
        this.navCtrl.setRoot(TabsPage);
      });
    });

    // Show the Auth0 Lock widget
    this.lock.show();
  }
}
