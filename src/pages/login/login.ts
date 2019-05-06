import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { ForgetPage } from '../forget/forget';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  public resources = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController) {

  }
  ionViewDidLload() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginAcc() {
    console.log("Email: "+ this.email);
    console.log("Password: "+ this.password);
    
    if((this.email.length===0) || this.password.length===0){
      const alert = this.alertCtrl.create({
        subTitle: 'Please fill all fields',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.events.publish('user: loggedin');
      this.navCtrl.setRoot(HomePage);
    }
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  goForget(){
    this.navCtrl.push(ForgetPage);
  }
}
