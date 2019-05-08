import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http'; 
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Profile } from '../../models/profile/profile.interface';
// import { AngularFireDatabase } from 'angularfire2/database'
// import { Observable } from 'rxjs';

@Component({
  selector: 'page-accountsettings',
  templateUrl: 'accountsettings.html',
})

export class AccountsettingsPage {

  id: number;
  name: string;
  email: string;
  license_plate: string;
  address: string;
  phone_number: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public data: Data,
    public alertCtrl: AlertController
    ) {}

  ionViewDidEnter(){
    this.data.getDataUser().then((user) => {
      // console.log("Ini adalah datanya " + user)
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.license_plate = user.license_plate;
      this.address = user.address;
      this.phone_number = user.phone_number;
    });
  }

  updateData() {
    //simpan update ke database
    let input = JSON.stringify({
        id: this.id,
        name:    this.name,
        email:    this.email,
        license_plate:    this.license_plate,
        address:    this.address,
        phone_number:    this.phone_number
      });
    console.log(input);
    this.http.post(this.data.BASE_URL+"/edit_profile.php", input)
    .subscribe(data => {
      let response = data.json();
      console.log(response);

      if(response.status == "200"){
        //update data user di local
        this.data.setDataUser(response.data);
          let alert = this.alertCtrl.create({
          title: 'Profil Berhasil Diubah !',
          subTitle: '',
          buttons: ['OK']
          });
          alert.present();
      }
      else
           {
             let alert = this.alertCtrl.create({
                title: 'Gagal Mengubah Profil',
                subTitle: '',      
                buttons: ['OK']
              });
              alert.present();
           }
      });
    };
  }