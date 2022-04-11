import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  public forgotPassword(data: any) {
    return this.http.post(`${URL}/api/auth/forgot-password`, data);
  }

  // forgotPassword(email: string){
  //   const data = { email };

  //   return new Promise(resolve =>{
  //    this.http.post(`${URL}/api/auth/forgot-password`, data).subscribe(async resp =>{
  //       if (resp["token"]){
  //         resolve(true);
  //       } else {
  //          resolve(false);
  //       }
  //    });
  //   });
  // }

}
