import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class Data {
  /*
    uncommand synxtax dibawah ini 
    jika ingin pakai API yang sudah di deploy
  */
  public BASE_URL = 'http://barengin.atspace.cc';

  // public BASE_URL = 'http://localhost/barengin-api';
  public HAS_LOGGED_IN = 'status_login';

  constructor(
    public http: Http, 
    public storage: Storage
    ) {
    console.log('Hello Data Provider');
  }

  login(data: any) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
  };

  isLogin() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  getDataUser() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }

  setDataUser(data: any) {
    this.storage.set('user_data', data);
  }

  getDataHalte() {
    return this.storage.get('halte_lot').then((value) => {
      return value;
    });
  }

  setDataHalte(data: any) {
    this.storage.set('halte_lot', data);
  }

  getDataParkLot() {
    return this.storage.get('park_lot').then((value) => {
      return value;
    });
  }

  setDataParkLot(data: any) {
    this.storage.set('park_lot', data);
  }

  getParkHistory() {
    return this.storage.get('park_history').then((value) => {
      return value;
    });
  }

  setParkHistory(data: any) {
    this.storage.set('park_history', data);
  }
}
