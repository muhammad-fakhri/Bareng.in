import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';
import { GuidemePage } from '../pages/guideme/guideme';
import { HaltelocationPage } from '../pages/haltelocation/haltelocation';
import { ParkinghistoryPage } from '../pages/parkinghistory/parkinghistory';
import { AccountsettingsPage } from '../pages/accountsettings/accountsettings';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    GuidemePage,
    HaltelocationPage,
    ParkinghistoryPage,
    AccountsettingsPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    GuidemePage,
    HaltelocationPage,
    ParkinghistoryPage,
    AccountsettingsPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
