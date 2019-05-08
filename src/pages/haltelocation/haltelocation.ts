import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';

@Component({
  selector: 'page-haltelocation',
  templateUrl: 'haltelocation.html',
})
export class HaltelocationPage {

  halteId: number;
  halte_name2: string;
  halte_info: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data:
      Data,
    public http: Http,
    private alertCtrl: AlertController
  ) {
    console.log('ionViewDidLoad HaltelocationPage');
    this.http.get(this.data.BASE_URL + "/get_halte.php")
      .subscribe(dataHalte => {
        let response = dataHalte.json();
        console.log(response);
        if (response.status == "200") {
          //masukin data ke localstorage
          this.data.setDataHalte(response.data);

          this.data.getDataHalte().then((halte) => {
            // this.halteId = halte.halteId;
            this.halte_name2 = halte.halte_name;
            console.log(this.halte_name2);
            // this.halte_info = halte.halte_info;
          });

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Ambil data halte error !',
            subTitle: 'Terjadi kesalahan mohon coba kembali sebentar lagi !',
            buttons: ['OK']
          });
          alert.present();
        }
      });

    // this.data.getDataHalte().then((halte) => {
    //   // this.halteId = halte.halteId;
    //   this.halte_name = halte.halte_name;
    //   console.log(this.halte_name);
    //   // this.halte_info = halte.halte_info;
    // });
  }

  ionViewDidLoad() { }
}
