import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
// import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { Data } from '../../providers/datasource';
import { AlertController } from 'ionic-angular';

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
    // private fire: AngularFireAuth,
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
  register(){
      let input = JSON.stringify({
        name:      this.name,
        email:       this.email,
        password:    this.password,
        repassword:  this.repassword
      });

      //test inputnya
      console.log(input);

      if(true){
        this.http.post(this.data.BASE_URL+"/register.php",input)
        .subscribe(data => {
        let response = data.json();
        console.log(response);
    if(response.status=="200"){
          let alert = this.alertCtrl.create({
                title: 'Selamat !',
                subTitle: 'Akun kamu berhasil terdaftar',      
                buttons: ['OK']
              });
              alert.present();
        this.navCtrl.push(LoginPage);
      }
      else if(response.status=="409"){
             let alert = this.alertCtrl.create({
                title: 'Email sudah terdaftar',
                subTitle: 'Silahkan pilih email lain.',      
                buttons: ['OK']
              });
              alert.present();
      }
      else
           {
             let alert = this.alertCtrl.create({
                title: 'Gagal Membuat Akun',
                subTitle: 'Periksa kembali data.',      
                buttons: ['OK']
              });
              alert.present();
           }

      });
    }
    // else {
    //     // loading.dismiss();
    //     // this.vibration.vibrate(1000);
    //     let alert = this.alertCtrl.create({
    //             title: 'Gagal Membuat Akun',
    //             subTitle: 'Periksa kembali data.',      
    //             buttons: ['OK']
    //           });
    //           alert.present();
    //     // this.submitted2 = false;
    //   }
  }
}
