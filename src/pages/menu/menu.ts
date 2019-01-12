import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { AccountdbPage } from '../accountdb/accountdb';
import { HomePage } from '../home/home';
import { InstellingenPage } from '../instellingen/instellingen';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
 
  public id: string;
  public sex: string;
  private employees;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public empProv: EmployeeProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
    ) 
  {
  this.id = this.navParams.get('data');
  }

  ionViewDidEnter() {
    this.empProv.read()
      .then(data => {
        //wordt de id in data weergegeven
        for (let i = 0; i < data.rows.length; i++) {
          if (this.id == data.rows[i].doc._id) {
            console.log(this.employees = data.rows.doc);
          }
        }
        //this.employees = data.rows;
      });
  }

  showDetails(employee) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }

  reReadEmployees() {
    this.empProv.read()
      .then(data => {
        console.log(this.employees = data.rows);
      });
  }
  //data wordt terug gestuurd naar accountdb
  accountdb() {
    let geslacht = this.sex;
    this.viewCtrl.dismiss(geslacht);
    console.log(geslacht+" data terug gestuurd");

    //this.navCtrl.push(AccountdbPage);

  }
  homepage(){
    this.navCtrl.push(HomePage);
  }
  instellingen() {
    //data van de instelling pagina terug op te halen
    let modal = this.modalCtrl.create(InstellingenPage);
    modal.onDidDismiss((data) => {
      this.sex = data;
      console.log(this.sex);
    })
    modal.present();
  }
  //de data word terug gestuurd naar de vorige pagina(menupagian)
  
}
