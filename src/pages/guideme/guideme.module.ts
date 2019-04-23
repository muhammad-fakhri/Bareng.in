import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidemePage } from './guideme';

@NgModule({
  declarations: [
    GuidemePage,
  ],
  imports: [
    IonicPageModule.forChild(GuidemePage),
  ],
})
export class GuidemePageModule {}
