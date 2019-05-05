import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile/profile.interface';
// import { AngularFireDatabase } from 'angularfire2/database'
// import { Observable } from 'rxjs';

@Component({
  selector: 'page-accountsettings',
  templateUrl: 'accountsettings.html',
})

export class AccountsettingsPage {

  //Buat profile object
  profile = {} as Profile;

  //Buat reference untuk ke database firebase
  // profileRef:Observable<Profile[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: AngularFireAuth
    // private database: AngularFireDatabase
    ) {
    // this.profileRef = this.database.list('user-profile');
    this.email = fire.auth.currentUser.email;
  }

  updateData(profile: Profile) {
    console.log(profile);
    // this.profileRef.push(this.profile);

    // this.navCtrl.setRoot(HomePage); 
  }

}
