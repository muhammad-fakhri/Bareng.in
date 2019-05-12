import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BustrackingPage } from './bustracking';

@NgModule({
  declarations: [
    BustrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(BustrackingPage),
  ],
})
export class BustrackingPageModule {}
