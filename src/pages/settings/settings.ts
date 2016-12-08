import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { AnalyticsService } from '../../providers/analytics-service';

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

  constructor(public appCtrl: App, public auth: AuthService, public analytics: AnalyticsService) { }

  ionViewDidEnter() {
    this.analytics.ReportPageNavigation('SettingsPage');
  }

  public logout() {
    // Wipe login state
    this.auth.logout();
    // Navigate to home page (set app root so that no back button is displayed)
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
