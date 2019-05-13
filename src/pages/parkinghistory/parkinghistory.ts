import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';
import { Time } from '@angular/common';

@Component({
  selector: 'page-parkinghistory',
  templateUrl: 'parkinghistory.html',
})
export class ParkinghistoryPage {

  history_id: number;
  user_id: string;
  history_date: Date;
  history_time: Time;
  park_lot_id: string;
  history: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public http: Http,
    private alertCtrl: AlertController
  ) {
    console.log('ionViewDidLoad ParkinghistoryPage');
        // Query data halte dari API
        this.http.get(this.data.BASE_URL + "/save_history.php",{})
        .subscribe(dataHistory => {
          let response = dataHistory.json();
          console.log(response);
          if (response.status == "200") {
  
            //masukin data ke localstorage
            this.data.setDataHistory(response.data);
  
            //ambil data dari local storage
            this.data.getDataHistory().then(historyData => {
              this.history = historyData;
            });
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Ada Kesalahan!',
              subTitle: 'Terjadi kesalahan saat mengambil data dari database !',
              buttons: ['OK']
            });
            alert.present();
          }
        });
  
  }

  ionViewDidLoad() {}
}