import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';
declare var google;
@Component({
  selector: 'page-parkir',
  templateUrl: 'parkir.html',
})
export class ParkirPage {
  @ViewChild('map') mapElement: ElementRef;
  gate:any;
  map: any;
  frontGate: any; 
  backGate: any; 
  place: any; //naruh inputan dari view untuk tempat kedua
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
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public http: Http,
    public alertCtrl: AlertController
    ) {
      //ambil parameter
      this.gate = navParams.get('origin');
    }

  ionViewDidLoad() {
    //ambil data tempat parkir dari database
    // this.http.get(this.data.BASE_URL+"/get_parklot.php?gate="+this.gate, {})
    //   .subscribe(dataParkLot => {
    //     let response = dataParkLot.json();
    //     if (response.status == "200") {
    //       console.log("ini dia data tempat parkirnya bos", response);
    //       this.parkLot = response.data;
    //     }
    //     else {
    //       let alert = this.alertCtrl.create({
    //         title: 'Ada Kesalahan !',
    //         subTitle: 'Terjadi kesalahan saat mengambil data dari database !',
    //         buttons: ['OK']
    //       });
    //       alert.present();
    //     }
    //   });
    //tampilin mapsnya
    this.initMap();
    if(this.gate == "front"){
      this.frontAlert();
    } else if (this.gate == "back") {
      this.backAlert();
    }
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
    this.frontGate = "-6.562110, 106.727211";
    this.backGate = "-6.551656, 106.726980";

    //tampilin mapsnya
    this.directionsDisplay.setMap(this.map);
  }

  async frontAlert(){
    const alert = await this.alertCtrl.create({
      title: 'Choose your parking lot',
      inputs: [
        {
          name: 'front1',
          type: 'radio',
          label: 'Graha Widya Wisuda',
          value: '-6.559788, 106.730874'
        },
        {
          name: 'front2',
          type: 'radio',
          label: 'Gymnasium',
          value: '-6.557332, 106.732342'
        },
        {
          name: 'front3',
          type: 'radio',
          label: 'FEMA FATETA',
          value: '-6.559051, 106.727673'
        },
        {
          name: 'front4',
          type: 'radio',
          label: 'Rektorat IPB',
          value: '-6.560232, 106.724233'
        }
      ],
      buttons: [
        {
          text: 'Lets Park !',
          handler: gate_input => {
            // this.gate = gate_input;
            this.place = gate_input;
            console.log(this.place);
            this.tampilRute();
        }
      }
      ]
    });
    await alert.present();
  }

  async backAlert(){
    const alert = await this.alertCtrl.create({
      title: 'Choose your parking lot',
      inputs: [
        {
          name: 'back1',
          type: 'radio',
          label: 'Teaching Lab (Khusus Motor)',
          value: '-6.555296, 106.729592'
        },
        {
          name: 'back2',
          type: 'radio',
          label: 'Fakultas Peternakan',
          value: '-6.556247, 106.721957'
        },
        {
          name: 'back3',
          type: 'radio',
          label: 'Masjid Al Hurriyyah',
          value: '-6.555701, 106.726104'
        }
      ],
      buttons: [
        {
          text: 'Lets Park !',
          handler: gate_input => {
            this.place = gate_input;
            console.log(this.place);
            this.tampilRute();
        }
      }
      ]
    });
    await alert.present();
  }

  tampilRute() {
    //parsing dulu koordinatnya
    this.pos = this.place.indexOf(',');
    this.temp3 = parseFloat(this.place.substring(0, this.pos));
    this.temp4 = parseFloat(this.place.substring(this.pos + 1, this.place.length));
    if(this.gate == "front"){
      this.temp1 = parseFloat(this.frontGate.substring(0, this.pos));
      this.temp2 = parseFloat(this.frontGate.substring(this.pos + 1, this.frontGate.length));
    } else if (this.gate == "back") {
      this.temp1 = parseFloat(this.backGate.substring(0, this.pos));
      this.temp2 = parseFloat(this.backGate.substring(this.pos + 1, this.backGate.length));
    }

    //make start and end point of route
    this.start = new google.maps.LatLng(this.temp1, this.temp2);
    this.end = new google.maps.LatLng(this.temp3, this.temp4);
    
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

  backtoHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
