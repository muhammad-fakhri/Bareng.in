import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-parkinghistory',
  templateUrl: 'parkinghistory.html',
})
export class ParkinghistoryPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkinghistoryPage');
  }

}
