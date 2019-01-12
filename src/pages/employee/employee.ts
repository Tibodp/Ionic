import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ImageProvider } from './../../providers/image/image';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {


  private employee: any = {};
  private canDelete = false;
  private canUpdate = false;
  private canAdd = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empProv: EmployeeProvider,
    public viewCtrl: ViewController,
    public imgProv: ImageProvider,
    private camera: Camera
  ) {}

  ionViewDidEnter() {
    var employee = this.navParams.get('employee');
    if (employee) {
      this.employee = employee.doc;
      this.canDelete = true;
      this.canUpdate = true;
      this.canAdd = false;
    }
  }
  homepage() {
    this.navCtrl.push(HomePage);
  }
  addOrUpdate() {
    if (this.employee.firstName != undefined && this.employee.lastName != undefined) {
      if (this.canUpdate) {
        this.empProv.update(this.employee);
      }
    else {
          this.empProv.createEm(this.employee);
        }
    }
    this.viewCtrl.dismiss(this.employee);
  }

  delete() {
    this.empProv.delete(this.employee);
    this.viewCtrl.dismiss(this.employee);
  }

  takePhotograph() {
    this.imgProv.takePhotograph()
      .then((image) => {
         this.employee._attachments = { 'Profile.png': {
             content_type: 'image/png',
             data: image.toString()
          }
         }
         console.log(this.employee);
      })
      .catch((err) => {
         console.log(err);
      });
   }
  login() {
    this.navCtrl.push(LoginPage)
  }
}
