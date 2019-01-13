import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-welkome',
  templateUrl: 'accountdb.html',
})
export class  AccountdbPage {
  private employees;
  public id: string;
  public sex: string
  private likeLijst: Array<string> = [];
  private vrouwenLijst: Array<string> = [];
  private mannenLijst: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public empProv: EmployeeProvider,
    public navParams: NavParams
  ) 
  { 
    this.id = this.navParams.get('data');
    
  }

  ionViewDidEnter() {
    this.empProv.read()
      .then(data => {
//Probleem 1) omdat data uit 6 objecten bestaat word er 6x push gedaan
        for (let i = 0; i < data.rows.length; i++) {
          if ("vrouw" == data.rows[i].doc.sex) {
            this.vrouwenLijst.push(data.rows[i]);
          }
          else if ("man" == data.rows[i].doc.sex) {
            this.mannenLijst.push(data.rows[i]);
          }
        }
        if (this.sex == "man") {
          this.employees = this.mannenLijst
          console.log("if man");
        }
        else if (this.sex == "vrouw"){
          this.employees = this.vrouwenLijst
          console.log(this.vrouwenLijst);
        }
        else {
          this.employees = data.rows;
          console.log("else"+this.sex);
        }
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
      .then(data => {
        //this.employees = data.rows;
        console.log(this.employees = data.rows);
      });
  }
  swipe(event) {
    if (event.direction === 2) {
      console.log("swiped to left");
    }
    if (event.direction === 4) {
      
      console.log("swiped to right");
    }
  }
 like(employee){
   this.likeLijst.push(employee.id);
   console.log(this.likeLijst);
   (this.employees).splice(employee, 1);
 }
 hide(employee){
  (this.employees).splice(employee, 1);
 }
 remove(no){
   (this.employees).splice(no, 1);
   console.log("remove");
 }
  login(){
    this.navCtrl.push(LoginPage)
  }
//Probleem 2) er kan geen data gestuurd worden en data terug krijgen in één methode
  menupage() {
    //data word door gestuurd naar de menu pagina
    //this.navCtrl.push(MenuPage, { data: this.id });

    //data van de menu pagina terug krijgen
    let modal = this.modalCtrl.create(MenuPage);
    modal.onDidDismiss((geslacht) => {
      this.sex = geslacht;
      console.log(this.sex);
      console.log(this.ionViewDidEnter());
    })
    modal.present();
  }
  homepage() {
    this.navCtrl.push(HomePage);
    let alert = this.alertCtrl.create({
      title: 'Log out Successful',
      subTitle: 'You are logged out',
      buttons: ['OK']
    });
    alert.present();
  }
}
