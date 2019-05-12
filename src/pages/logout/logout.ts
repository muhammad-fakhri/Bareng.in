import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { Data } from '../../providers/datasource';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

	user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public data: Data
  ) { }

  ionViewDidLoad() {
    this.events.publish('user:loggedout');
    this.data.logout();
    this.navCtrl.setRoot(LoginPage);
    console.log("Logout success!")
  }
}
