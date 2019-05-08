import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';

@Component({
  selector: 'page-haltelocation',
  templateUrl: 'haltelocation.html',
})
export class HaltelocationPage {

  halteId: number;
  halte: string;
  halte_info: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public http: Http,
    private alertCtrl: AlertController
  ) {
    console.log('ionViewDidLoad HaltelocationPage');
  }

  ionViewDidLoad() {
    // Query data halte dari API
    this.http.get(this.data.BASE_URL + "/get_halte.php")
      .subscribe(dataHalte => {
        let response = dataHalte.json();
        console.log(response);
        if (response.status == "200") {

          //masukin data ke localstorage
          this.data.setDataHalte(response.data);

          //ambil data dari local storage
          this.data.getDataHalte().then(halteData => {
            this.halte = halteData;
          });
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Ambil Kesalahan !',
            subTitle: 'Terjadi kesalahan saat mengambil data dari database !',
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }
}