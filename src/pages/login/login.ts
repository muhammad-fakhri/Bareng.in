import { Component } from '@angular/core';
import { Events, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ForgetPage } from '../forget/forget';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgForm } from '@angular/forms';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  loginForm: FormGroup;

  constructor(
    // private fire: AngularFireAuth,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public events: Events,
    public data: Data,
    public http: Http,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  
  ionViewDidLoad() {
    console.log("Let's login !");
  }

  login() {
    let input = JSON.stringify({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    });
    //query data user dari API
    this.http.post(this.data.BASE_URL + "/login.php", input).subscribe(data => {
      console.log(input);
      let response = data.json();
      console.log(response);
      if (response.status == "200") {
        //masukin data ke localstorage
        this.data.login(response.data);
        let alert = this.alertCtrl.create({
          title: 'Selamat Datang',
          subTitle: 'Kamu Berhasil Login',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);
      }
      else if (response.status == "404") {
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Tidak ada akun dengan email ini',
          buttons: ['OK']
        });
        alert.present();
      } else if(response.status == "406") {
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Password salah !',
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Ada kesalahan, mohon coba lagi sebentar lagi !',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goForget() {
    this.navCtrl.push(ForgetPage);
  }
}
