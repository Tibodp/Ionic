import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-instellingen',
  templateUrl: 'instellingen.html',
})
export class InstellingenPage {
  
  public sex: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstellingenPage');
  }
  //de data word terug gestuurd naar de vorige pagina(menupagian)
  closeModal(){
    this.sex = "vrouw";
    let data = this.sex;
     this.viewCtrl.dismiss(data);
     console.log("close")
  }
}
