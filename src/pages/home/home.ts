import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
// import { AngularFireAuth } from 'angularfire2/auth';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data1: any;
  public data2: any;
  public LotName: string;
  public LotQuota: number;
  public LotAddress: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  place1: any;
  place2: any;
  temp1: any;
  temp2: any;
  temp3: any;
  temp4: any;
  start: any;
  end: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    // private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public data: Data
  ) { }

  ionViewDidLoad() {
    console.log('Loading Map dari Google MAP API');
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: { lat: -6.560556, lng: 106.726189 }
    });

    this.temp1 = -6.564649;
    this.temp2 = 106.730328;
    this.temp3 = -6.559917;
    this.temp4 = 106.725510;
    this.directionsDisplay.setMap(this.map);
  }

  tampilRute() {
    console.log("titik start :", this.place1);
    console.log("titik end :", this.place2);
    //place 1 coordinate convert
    this.http.post(this.data.BASE_URL + "/convert.php?coordinate=" + this.place1, {})
      .subscribe(data1 => {
        let response1 = data1.json();
        console.log(response1);
        this.temp1 = response1.lat;
        this.temp2 = response1.lng;
      })

    //place 2 coordinate convert
    this.http.post(this.data.BASE_URL + "/convert.php?coordinate=" + this.place2, {})
      .subscribe(data2 => {
        let response2 = data2.json();
        console.log(response2);
        this.temp3 = response2.lat;
        this.temp4 = response2.lng;
      })

    console.log("Ini adalah temp1 ; ", this.temp1);
    console.log("Ini adalah temp2 ; ", this.temp2);
    console.log("Ini adalah temp3 ; ", this.temp3);
    console.log("Ini adalah temp4 ; ", this.temp4);

    //make start and end point of route
    this.start = new google.maps.LatLng(this.temp1, this.temp2);
    this.end = new google.maps.LatLng(this.temp3, this.temp4);
    console.log(this.start);
    console.log(this.end);

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