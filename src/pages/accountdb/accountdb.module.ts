import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountdbPage } from './accountdb';

@NgModule({
  declarations: [
    AccountdbPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountdbPage),
  ],
})
export class AccountDBPageModule {}
