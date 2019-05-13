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
  // login() {
  //   this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
  //   .then( data => {
  //     console.log('datanya nih ! ', data);
  //     console.log('Akunnya ada, user bakal di log in !');
  //     this.alert('Selamat, kamu berhasil login !');
  //     this.navCtrl.setRoot(HomePage);
  //   })
  //   .catch(error => {
  //     console.log('Ada error nih !', error);
  //     this.alert(error.message);
  //   })
  // }

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
          title: 'Welcome',
          subTitle: 'Success to login',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);
      }
      else if (response.status == "404") {
        let alert = this.alertCtrl.create({
          title: 'Failed to login',
          subTitle: 'This email has not been registered',
          buttons: ['OK']
        });
        alert.present();
      } else if(response.status == "406") {
        let alert = this.alertCtrl.create({
          title: 'Failed to login',
          subTitle: 'Wrong Password !',
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Failed to login',
          subTitle: 'Please try again or check your internet connection!',
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
