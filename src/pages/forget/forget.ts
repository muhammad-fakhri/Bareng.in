import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  email: any;
  forgetForm: FormGroup;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.forgetForm = this.formBuilder.group({
      email:['', Validators.compose([
        Validators.required,
        Validators.email
        ])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }

  forget() {
    this.email = "bego";
    if (this.email.length == 0) {
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
