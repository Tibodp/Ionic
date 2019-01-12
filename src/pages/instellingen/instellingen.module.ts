import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstellingenPage } from './instellingen';

@NgModule({
  declarations: [
    InstellingenPage,
  ],
  imports: [
    IonicPageModule.forChild(InstellingenPage),
  ],
})
export class InstellingenPageModule {}
