import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // App startup (root) page, set dynamically later based on persisted auth state.
  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Chapters', component: ListPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // load persisted auth state
      this.auth.readPersistedStateAsync().then(() => {
        // Set the appropriate startup page (set root so that no back button is displayed)
        if (!this.auth.authenticated()) {
          // Initiate login, if not logged in
          this.rootPage = LoginPage;
        } else {
          // Go to the main tabs page container, if logged in
          this.rootPage = TabsPage;
        }
      });

      // Schedule a token refresh on app start up
      this.auth.startupTokenRefresh();
    });
  }
}
