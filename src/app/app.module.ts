import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Servers } from '../providers/server';
import { DataSource } from '../providers/datasource';
import { HttpModule, JsonpModule } from '@angular/http';
 
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';
import { GuidemePage } from '../pages/guideme/guideme';
import { HaltelocationPage } from '../pages/haltelocation/haltelocation';
import { ParkinghistoryPage } from '../pages/parkinghistory/parkinghistory';
import { AccountsettingsPage } from '../pages/accountsettings/accountsettings';
import { OpeningPage } from '../pages/opening/opening';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
 
@NgModule({
  declarations: [
    MyApp,
    OpeningPage,
    LoginPage,
    RegisterPage,
    HomePage,
    GuidemePage,
    HaltelocationPage,
    ParkinghistoryPage,
    AccountsettingsPage,
    LogoutPage,
    ForgetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OpeningPage,
    LoginPage,
    RegisterPage,
    HomePage,
    GuidemePage,
    HaltelocationPage,
    ParkinghistoryPage,
    AccountsettingsPage,
    LogoutPage,
    ForgetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Servers,
    DataSource,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
