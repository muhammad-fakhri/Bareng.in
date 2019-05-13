import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Data } from '../../providers/datasource';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
// import { AngularFireAuth } from 'angularfire2/auth';
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
  ) { }

  ionViewDidEnter() {
    this.data.getDataUser().then((user) => {
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
      name: this.name, 
      email: this.email,
      license_plate: this.license_plate,
      address: this.address,
      phone_number: this.phone_number
    });
    console.log(input);
    this.http.post(this.data.BASE_URL + "/edit_profile.php", input)
      .subscribe(data => {
        let response = data.json();
        console.log(response);

        if (response.status == "200") {
          //update data user di local
          this.data.setDataUser(response.data);
          let alert = this.alertCtrl.create({
            title: 'Your profile has changed!',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Failed to change profile!',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }

  deleteAccount(){
    // let id = this.id;
    this.http.post(this.data.BASE_URL+"/delete_user.php?id="+this.id,{})
      .subscribe(data => {
        let response = data.json();
        console.log(response);
        if (response.status == "200") {
          this.data.logout();
          let alert = this.alertCtrl.create({
            title: 'Good bye!',
            subTitle: 'Success to delete you account!',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
        }
      })
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Are you sure that you want to delete your account permanently?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            // this.confirm.dismiss();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.deleteAccount();
          }
        }
      ]
    });
    confirm.present();
  }
}