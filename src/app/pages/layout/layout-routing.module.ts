import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
   {
    path: 'app',
    component: LayoutPage,
    children: [
      {
        path: 'list-drivers',
        loadChildren: () => import('../admin-logist/drivers/drivers/drivers.module').then( m => m.DriversPageModule)
      },
      {
        path: 'list-travels',
        loadChildren: () => import('../driver/travels/travels.module').then( m => m.TravelsPageModule)
      },
       {
         path: '',
         redirectTo: '/main/app/drivers',
         pathMatch: 'full'
       }
    ]
  },
  {
    path: '',
    redirectTo: '/main/app/drivers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
