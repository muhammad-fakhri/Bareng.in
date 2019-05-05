import { Component } from '@angular/core';
import { Events, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ForgetPage } from '../forget/forget';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController, 
    public navParams: NavParams, 
    public events: Events,
    private fire: AngularFireAuth
    ) {

  }

  alert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

  login() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
    .then( data => {
      console.log('datanya nih ! ', data);
      console.log('Akunnya ada, user bakal di log in !');
      this.alert('Selamat, kamu berhasil login !');
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error => {
      console.log('Ada error nih !', error);
      this.alert(error.message);
    })
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  goForget(){
    this.navCtrl.push(ForgetPage);
  }
}
