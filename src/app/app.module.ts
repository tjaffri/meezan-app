import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { QuranService } from '../providers/quran-service';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    SettingsPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    SettingsPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    AuthService,
    QuranService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule { }
