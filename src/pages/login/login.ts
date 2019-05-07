import { Component } from '@angular/core';
import { Events, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ForgetPage } from '../forget/forget';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
import { NgForm } from '@angular/forms';
 
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
    private fire: AngularFireAuth,
    public data: Data,
    public http: Http
    ) {

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

  login(){
    let input = JSON.stringify({
      email: this.email,
      password: this.password
    });
    this.http.post(this.data.BASE_URL+"/login.php",input).subscribe(data => {
        console.log(input);
        let response = data.json();
        console.log(response);
  if(response.status=="200"){
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
      else
           {
             let alert = this.alertCtrl.create({
                title: 'Gagal Masuk',
                subTitle: 'Email atau Password salah',      
                buttons: ['OK']
              });
              alert.present();
           }

      });
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  goForget(){
    this.navCtrl.push(ForgetPage);
  }
}
