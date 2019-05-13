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
          else if(response.status == "404") {
            let alert = this.alertCtrl.create({
              title: 'No Park History!',
              subTitle: "You doesn't have parking history!",
              buttons: ['OK']
            });
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: 'There is error!',
              subTitle: "Please try again or check your internet connection!",
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

  ionViewDidEnter() {
  }

}
