import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }

  forget(){
    if(this.email.length===0){
      const alert = this.alertCtrl.create({
        subTitle: 'Please tell us your email',
        buttons: ['OK'],
      });
      alert.present();
    }
    else {
      const alert = this.alertCtrl.create({
        subTitle: 'Email has been sent!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
