import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: AngularFireAuth
    ) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data => {
      // console.log('dapet datanya yeay !', data);
      console.log('bakal register orang pake ', this.email, this.password);
      this.navCtrl.setRoot(LoginPage);
    })
    .catch(error => {
      return console.log('Dapet error ', error);
    });
  }
}
