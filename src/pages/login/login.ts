import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { AccountdbPage } from '../accountdb/accountdb';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') uname;
  @ViewChild('password') password;
  
  private employees: any;
  private canUpdate = false;
  private voornaamLijst: Array<string> = [];
  private passwordLijst: Array<string> = [];

  constructor(
    private empProv: EmployeeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
    ) {
  }
  ionViewDidEnter() {
    console.log(this.reReadEmployees());
  }
  homepage(){
    this.navCtrl.push(HomePage);
  }

  reReadEmployees() {
  
    this.empProv.read()
      .then(data => {
        for (let i = 0; i < data.rows.length; i++) {
          this.voornaamLijst.push(data.rows[i].doc._id);
          this.passwordLijst.push(data.rows[i].doc.password);
        }
      });
  }
 
  singnIn() {
    let bestaat: boolean = false;
    for (let i = 0; i < this.voornaamLijst.length; i++) {
      if (this.uname.value == this.voornaamLijst[i]) {
        for (let j = 0; j < this.passwordLijst.length; j++) {
          if (this.password.value == this.passwordLijst[i]) {
            bestaat = true;

          }
        }
      }
    }

    var employee = this.navParams.get('employee');
    if (bestaat){
      let alert = this.alertCtrl.create({
        title: 'Login Successful',
        subTitle: 'You are logged in',
        buttons: ['OK']
      });
       alert.present();
      this.navCtrl.push(AccountdbPage, { data: this.uname.value });
      
      console.log('Login Successful')
      
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'wrong login',
        subTitle: 'oops you have given a wrong password or username, try again',
        buttons: ['OK']
      });
      alert.present();
      console.log('naam: ',this.uname.value,', password: ',this.password.value);
    }
  }
  
  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  } 
}
