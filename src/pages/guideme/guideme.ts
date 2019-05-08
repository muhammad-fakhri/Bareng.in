import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ParkirPage } from '../parkir/parkir';

@Component({
  selector: 'page-guideme',
  templateUrl: 'guideme.html',
})

export class GuidemePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidemePage');
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Where are you?');

    alert.addInput({
      type: 'radio',
      label: 'Gate 1 (Rektorat)',
      value: 'blue',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Gate 2 (Balebak)',
      value: 'blue'
    });

    alert.addButton('Cancel');
    alert.addButton('OK'); {
      this.navCtrl.setRoot(ParkirPage);
    }
    alert.present();
  }
}
