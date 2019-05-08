import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-opening',
  templateUrl: 'opening.html',
})
export class OpeningPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log("Let's having fun with Bareng.in !");
  }
  
  getStarted(){
    this.navCtrl.setRoot(LoginPage);
  }

}
