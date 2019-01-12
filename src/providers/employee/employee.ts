import { Injectable, asNativeElements } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import couchdb from 'couchdb';

import { Row } from 'ionic-angular';
import { cordovaWarn } from '@ionic-native/core';

@Injectable()
export class EmployeeProvider {

  data: any;
  db: any;

  //private remote = 'http://srv-app-087.alpaca.int:5984/employees/';
  private remote = 'http://127.0.0.1:5984/employees/';

  constructor(public http: HttpClient) {  }

  getOptions() {
     let httpHeaders = new HttpHeaders({
       'Content-Type' : 'application/json',
       'Accept' : 'application/json'
     });

     return { headers: httpHeaders };
  } 

  createEm(employee): void {
    console.log("data word afgedrukt");
    let url: string = this.remote + employee.firstName + ' ' + employee.lastName;
    this.http.put(url, JSON.stringify(employee), this.getOptions())
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  read(): Promise<any> {
    console.log("connectie succeed");
   let url: string = this.remote + '_all_docs?include_docs=true';
   return new Promise((resolve, reject) => {
      this.http.get(url, this.getOptions())
      .subscribe(data => {
        resolve(data);
      }, err => {
          console.log(err +'read');
      });
   });
  }
 
  update(employee): void {
     let url: string = this.remote + employee.firstName + ' ' + employee.lastName;
     this.http.get(url, this.getOptions())
       .subscribe(data => {
          this.http.put(url + '?rev=' + data['_rev'], JSON.stringify(employee), this.getOptions())
            .subscribe(data => {
              console.log(data);
            }, err => {
              console.log(err);
            });
       }, err => {
           console.log(err);
       });
  }

  delete(employee): void {
     let url: string = this.remote + employee.firstName + ' ' + employee.lastName;
     this.http.get(url, this.getOptions())
       .subscribe(data => {
          this.http.delete(url + '?rev=' + data['_rev'], this.getOptions())
            .subscribe(data => {
              console.log(data);
            }, err => {
              console.log(err);
            });
       }, err => {
           console.log(err);
       });
  }
}
