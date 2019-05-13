import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';
declare var google;
@Component({
  selector: 'page-haltelocation',
  templateUrl: 'haltelocation.html',
})
export class HaltelocationPage {
  @ViewChild('map') mapElement: ElementRef;
  halteId: number;
  halte: string;
  halte_info: string;
 map: any;
 directionsService = new google.maps.DirectionsService;
 directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public http: Http,
    private alertCtrl: AlertController
  ) {
    console.log('ionViewDidLoad HaltelocationPage');
        // Query data halte dari API
        this.http.get(this.data.BASE_URL + "/get_halte.php",{})
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
              title: 'There is problem!',
              subTitle: 'Please try again or check your internet connection!',
              buttons: ['OK']
            });
            alert.present();
          }
        });
  
  }

  ionViewDidLoad() {
    // this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: { lat: -6.560556, lng: 106.726189 }
    });
    //tampilin mapsnya
    this.directionsDisplay.setMap(this.map);
  }
}