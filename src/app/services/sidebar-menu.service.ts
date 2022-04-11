/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  constructor() { }

  getMenu(role: string): any[]{

    const menu: any[] = [
      {
        title: 'Inicio',
        icon: 'radio-static',
        url: 'home',
        show: true,
      },
      {
        title: 'Mis viajes',
        icon: 'radio-static',
        url: 'travels',
        show: true,
      },
      {
        title: 'Buscar viaje',
        icon: 'radio-static',
        url: 'search-travel',
        show: true,
      },
      {
        title: 'Notificaciones',
        icon: 'radio-static',
        url: 'notifications',
        show: true,
      },
      {
        title: 'Lista de espera',
        icon: 'radio-static',
        url: 'waiting-list',
        show: true,
      },
      {
        title: 'Vehículos',
        icon: 'radio-static',
        url: 'vehicles',
        show: role !== 'Driver' ? true : false
      },
      {
        title: 'Conductores',
        icon: 'radio-static',
        url: 'drivers',
        show: role !== 'Driver' ? true : false
      },
      {
        title: 'Llamar a centro de servicio',
        icon: 'radio-static',
        url: 'call-service',
        show: true,
      },
  ];
  return menu;
  }


  // menuDriver: any[] = [
  //   {
  //     title: 'Inicio',
  //     icon: 'radio-static',
  //     url: 'driver/home'
  //   },
  //   {
  //     title: 'Mis viajes',
  //     icon: 'radio-static',
  //     url: 'driver/travels'
  //   },
  //   {
  //     title: 'Buscar viaje',
  //     icon: 'radio-static',
  //     url: 'driver/search-travel'
  //   },
  //   {
  //     title: 'Notificaciones',
  //     icon: 'radio-static',
  //     url: 'driver/notifications'
  //   },
  //   {
  //     title: 'Lista de espera',
  //     icon: 'radio-static',
  //     url: 'driver/waiting-list'
  //   },
  //   {
  //     title: 'Llamar a centro de servicio',
  //     icon: 'radio-static',
  //     url: 'driver/call-service'
  //   },
  // ];
}
