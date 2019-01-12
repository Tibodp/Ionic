import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private employees;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public empProv: EmployeeProvider
  ) {}

  ionViewDidEnter() {
    this.empProv.read()
      .then(data => {
        this.employees = data.rows;
      });
  }
  showDetails(employee) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }
  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  }
  reReadEmployees() {
    this.empProv.read()
      .then(employees => {
        this.employees = employees;
      }).catch((err) => { console.log('dit bestaat al') });
  }
  login() {
    this.navCtrl.push(LoginPage)
  }
}
