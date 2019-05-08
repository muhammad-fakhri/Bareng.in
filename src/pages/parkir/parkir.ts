import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-parkir',
  templateUrl: 'parkir.html',
})
export class ParkirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkirPage');
  }
  
  backtoHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
