/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

const URL = environment.url;
const headersHttp = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = null;
  currentToken: string = null;
  roles: [] = [];
  currentRoles: any[] = [];
  manTruck: any = false;
  expiration: string = null;
  user: object = null;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private navCtrl: NavController,
    private location: Location
    ) { this.init(); }

    async init() {
      await this.storage.create();
    }

    public login(data: any) {
      return this.http.post(`${URL}/api/auth/login`, data, {headers: headersHttp});
    }

    public logout(){
      this.token = null;
      this.user = null;
      this.storage.clear();
      this.navCtrl.navigateRoot('/login', { animated: true });
    }

  async saveToken(token: string, expiration: string, user: object, roles: []){
     this.token = token;
     this.expiration = expiration;
     this.user = user;
     this.roles = roles;

    await this.storage.set('roles', roles);
    await this.storage.set('token', token);
    await this.storage.set('expiration_token', expiration);
    await this.storage.set('current_user', user);

    await this.validateToken();
   }

   async getToken(){
       this.currentToken = await this.storage.get('token') || null;
   }

   async validateToken(): Promise<boolean>{

    await this.getToken();
    if(!this.currentToken){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
   }

  //  async validateLogin(): Promise<boolean>{
  //    await this.getToken();
  //    if(!this.currentToken){
  //      return Promise.resolve(true);
  //    }

  //    this.location.back();
  //    return Promise.resolve(false);
  //  }

}
