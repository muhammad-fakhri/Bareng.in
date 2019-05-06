import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
<<<<<<< HEAD
import { AlertController } from 'ionic-angular';
=======
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
>>>>>>> eb0d58f37cfbab1daf285363891b89c56d7debdc

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

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
=======
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: AngularFireAuth
    ) {
>>>>>>> eb0d58f37cfbab1daf285363891b89c56d7debdc
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
<<<<<<< HEAD
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
=======
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data => {
      // console.log('dapet datanya yeay !', data);
      console.log('bakal register orang pake ', this.email, this.password);
      this.navCtrl.setRoot(LoginPage);
    })
    .catch(error => {
      return console.log('Dapet error ', error);
    });
>>>>>>> eb0d58f37cfbab1daf285363891b89c56d7debdc
  }
}
