import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkinghistoryPage } from './parkinghistory';

@NgModule({
  declarations: [
    ParkinghistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkinghistoryPage),
  ],
})
export class ParkinghistoryPageModule {}
