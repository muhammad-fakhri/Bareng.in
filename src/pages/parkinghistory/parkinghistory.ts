import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';

@Component({
  selector: 'page-parkinghistory',
  templateUrl: 'parkinghistory.html',
})
export class ParkinghistoryPage {
  history: any;
  userId: number;
  // user:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public data: Data,
    public alertCtrl: AlertController
  ) {
     //ambil data id user
     this.data.getDataUser().then(userData => {
      this.userId = userData.id;
      console.log("Id usernya nih 2: " + this.userId);
      //ambil data dari database
      this.http.get(this.data.BASE_URL + "/park_history.php?id=" + this.userId)
        .subscribe(dataHistory => {
          let response = dataHistory.json();
          console.log(response);
          if (response.status == "200") {
            //masukin data ke localstorage
            this.data.setParkHistory(response.data);
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
    });
    //ambil dari local storage
    this.data.getParkHistory().then(historyData => {
      //masukin ke local variable
      this.history = historyData;
      console.log("history nih :"+this.history);
    });
   }

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

  ionViewDidEnter() {
  }

}
