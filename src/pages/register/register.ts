import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
import { AlertController } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string;
  email: string;
  password: string;
  repassword: string;

  constructor(
    // private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public data: Data
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // register(){
  //   this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
  //   .then(data => {
  //     // console.log('dapet datanya yeay !', data);
  //     console.log('bakal register orang pake ', this.email, this.password);
  //     this.navCtrl.setRoot(LoginPage);
  //   })
  //   .catch(error => {
  //     return console.log('Dapet error ', error);
  //   });
  // }
  register() {
    let input = JSON.stringify({
      name: this.name,
      email: this.email,
      password: this.password,
      repassword: this.repassword
    });

    //log hasil inputnya (ini cuma buat testing)
    console.log(input);

    //masukin data ke database
    this.http.post(this.data.BASE_URL + "/register.php", input)
      .subscribe(data => {
        let response = data.json();

        // log responsenya (ini cuma buat testing)
        console.log(response);

        if (response.status == "200") {
          let alert = this.alertCtrl.create({
            title: 'Selamat !',
            subTitle: 'Akun kamu berhasil terdaftar',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(LoginPage);
        }
        else if (response.status == "409") {
          let alert = this.alertCtrl.create({
            title: 'Email sudah terdaftar',
            subTitle: 'Silahkan pilih email lain.',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Password tidak sama',
            subTitle: 'Mohon periksa kembali password dan konfirmasi password anda',
            buttons: ['OK']
          });
          alert.present();
        }
    });
  }
}
