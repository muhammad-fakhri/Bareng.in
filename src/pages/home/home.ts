import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Servers } from '../../providers/server';
import { DataSource } from '../../providers/datasource';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Servers]
})
export class HomePage {

	public data:any;
	public toggle: boolean = false;
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
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public db: Servers,
  	public datasource: DataSource
  	) {
      this.db.getData().subscribe(data =>{
          this.datasource.source = data.json();  
      });
  }

  createItem(newitem){
      let i = { 
      	'ParkLotName': newitem.value
      	// 'ParkLotQuota': newitem.LotQuota,
      	// 'ParkLotAddress': newitem.LotAddress,
      	 };
      this.db.create(i);
  }

  deleteItem(item){
    let result = this.db.delete(item);
    let index = this.datasource.source.indexOf(item);
    this.datasource.source.splice(index,1);
    console.log(result);	
  }

  editItem(item){
    this.toggle = true;
    this.LotName = item.LotName;
    // this.LotQuota = item.LotQuota;
    // this.LotAddress = item.LotAddress;
    this.datasource.tempdata = item;
  }

  updateItem(LotName){
    let i = { "ParkLotId": this.datasource.tempdata.id,"ParkLotName": LotName.value };
    let result = this.db.update(i);
    let index = this.datasource.source.indexOf(this.datasource.tempdata);
    this.datasource.source[index] = i;
    console.log(result);
    this.toggle = false;
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad HomePage');
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
