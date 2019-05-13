import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
// import { AngularFireAuth } from 'angularfire2/auth';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  place1: any; //naruh inputan dari view untuk tempat pertama
  place2: any; //naruh inputan dari view untuk tempat kedua
  temp1: any; //nampung nilai Lat dari tempat pertama
  temp2: any; //nampung nilai Lng dari tempat pertama
  temp3: any; //nampung nilai Lat dari tempat kedua
  temp4: any; //nampung nilai Lng dari tempat kedua
  start: any; //nampung Lat dan Lng dari tempat pertama
  pos: number; //untuk posisi koma di proses parsing
  end: any; //nampung Lat dan Lng dari tempat kedua
  parkLot: string; //nampung data dari database
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    // private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public data: Data,
    public alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    //ambil data tempat parkit dari database
    this.http.get(this.data.BASE_URL + "/get_parklot.php", {})
      .subscribe(dataParkLot => {
        let response = dataParkLot.json();
        if (response.status == "200") {
          // console.log("ini dia data tempat parkirnya bos", response);
          this.parkLot = response.data;
          // console.log(this.parkLot);
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
    //tampilin mapsnya
    // console.log('Loading Map dari Google MAP API');
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: { lat: -6.560556, lng: 106.726189 }
    });

    //inisialisasi nilai awal untuk rute
    this.temp1 = -6.560556;
    this.temp2 = 106.726189;
    this.temp3 = -6.560556;
    this.temp4 = 106.726189;
    this.place1 = "-6.560232, 106.724233";
    this.place2 = "-6.560232, 106.724233";

    //tampilin mapsnya
    this.directionsDisplay.setMap(this.map);
  }

  tampilRute() {
    //unutk testing aja
    // console.log("titik start :", this.place1);
    // console.log("titik end :", this.place2);

    //parsing dulu koordinatnya
    this.pos = this.place1.indexOf(',');
    this.temp1 = parseFloat(this.place1.substring(0, this.pos));
    this.temp2 = parseFloat(this.place1.substring(this.pos + 1, this.place1.length));
    this.temp3 = parseFloat(this.place2.substring(0, this.pos));
    this.temp4 = parseFloat(this.place2.substring(this.pos + 1, this.place2.length));

    //untuk testing aja
    // console.log("Ini adalah temp1 ; ", this.temp1);
    // console.log("Ini adalah temp2 ; ", this.temp2);
    // console.log("Ini adalah temp3 ; ", this.temp3);
    // console.log("Ini adalah temp4 ; ", this.temp4);

    //make start and end point of route
    this.start = new google.maps.LatLng(this.temp1, this.temp2);
    this.end = new google.maps.LatLng(this.temp3, this.temp4);
    
    //untuk testing aja
    // console.log(this.start);
    // console.log(this.end);

    //do the route calculation
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}