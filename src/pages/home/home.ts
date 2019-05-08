import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public data:any;
  public LotName: string;
  public LotQuota: number;
  public LotAddress: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;  

  constructor(
    // private fire: AngularFireAuth,
  	public navCtrl: NavController, 
  	public navParams: NavParams
  	) {}

  ionViewDidLoad() {
    console.log('Loading Map dari Google MAP API');
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: -6.560556, lng: 106.726189}
    });

    this.directionsDisplay.setMap(this.map);
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