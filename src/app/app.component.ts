import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';
import { GuidemePage } from '../pages/guideme/guideme';
import { HaltelocationPage } from '../pages/haltelocation/haltelocation';
import { ParkinghistoryPage } from '../pages/parkinghistory/parkinghistory';
import { AccountsettingsPage } from '../pages/accountsettings/accountsettings';
import { OpeningPage } from '../pages/opening/opening';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = OpeningPage;
  
  pages: Array<{title: string, component:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

      this.pages = [
        {title: 'Home', component: HomePage},
        {title: 'Guide Me', component: GuidemePage},
        {title: 'Halte Location', component: HaltelocationPage},
        {title: 'Parking History', component: ParkinghistoryPage},
        {title: 'Account Settings', component: AccountsettingsPage},
        {title: 'Logout', component: LogoutPage}
      ];
  }
    
  initializeApp(){
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

