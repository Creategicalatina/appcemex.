/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from 'src/app/services/auth/login.service';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {

  notDriver = false;
  roles: any[] = [];
  menu: any[] = [];
  user = {
    name: '',
  };
  constructor(
    private storage: Storage,
    private sideBarMenu: SidebarMenuService,
    public loginService: LoginService
    ) {

    }

  async ngOnInit() {

      await this.storage.create();
      await this.getRoles();
      await this.validateRol();
      await this.currentUser();

  }

  logout(){
    this.menu = [];
    this.roles = [];
    this.loginService.logout();
  }

  async currentUser(){
    await this.storage.get('current_user').then(resp =>{
      this.user.name = resp.user.firstName+' '+resp.user.lastName;
      // this.user.name = 'Mauricio Perez';
    });
  }

  async getRoles(){
    await this.storage.get('roles').then(resp =>{
      this.roles = resp;
    });
  }

  async validateRol(){

    this.roles.map((rol)=>{
      if(rol !== 'Driver'){
        this.notDriver = true;
      }
    });
      // this.menu =  this.sideBarMenu.getMenu(notDriver ? '': 'Driver');
  }

}
