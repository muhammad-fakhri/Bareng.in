import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  public BASE_URL = 'http://localhost/barengin-api';
  // public BASE_URL = 'http://barengin.atspace.cc';
  
  public HAS_LOGGED_IN = 'status_login';
  
  constructor(public http: Http , public storage: Storage) {
    console.log('Hello Data Provider');
  }

  login(data : any) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
  };

  isLogin(){
    return this.storage.get(this.HAS_LOGGED_IN).then((value)=>{
      return value;
    });
  }
  
  // dapetnnya pas dari login
  getDataUser() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }

   getDataHalte() {
    return this.storage.get('halte_lot').then((value) => {
      return value;
    });
  }

  setDataHalte(data:any) {
    this.storage.set('halte_lot', data);
  }
}
