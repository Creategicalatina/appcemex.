import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorMessagesComponent } from '../utilities/error-messages/error-messages.component';
import { AlertConfimComponent } from './alert-confim/alert-confim.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { LayoutPage } from '../pages/layout/layout.page';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AlertSuccessComponent,
    AlertConfimComponent,
    ErrorMessagesComponent,
    LayoutPage,
    MenuComponent,
    ToastMessageComponent,
  ],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
  ],
  exports:[
    LayoutPage,
    AlertSuccessComponent,
    AlertConfimComponent,
    ErrorMessagesComponent,
    MenuComponent,
    ToastMessageComponent
  ]
})
export class ComponentsModule { }
