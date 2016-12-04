import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public appCtrl: App, public auth: AuthService) { }

  ionViewDidLoad() {
    console.log('Settings Page: Loaded');
  }

  public logout() {
    // Wipe login state
    this.auth.logout();
    // Navigate to home page (set app root so that no back button is displayed)
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
