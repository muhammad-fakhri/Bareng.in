import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string;
  email: string;
  password: string;
  repassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    if(this.name.length===0 || this.email.length===0 || this.password.length===0){
      const alert = this.alertCtrl.create({
        subTitle: 'Please fill all fields',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.password.length<8) {
      const alert = this.alertCtrl.create({
        subTitle: 'Passwords must contain more than 8 characters',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.repassword !== this.password) {
      const alert = this.alertCtrl.create({
        subTitle: 'Those confirm password didnt match. Try again.',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
        this.navCtrl.setRoot(HomePage);
    }
  }
}
