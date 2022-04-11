import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorMessagesComponent } from '../utilities/error-messages/error-messages.component';
import { AlertConfimComponent } from './alert-confim/alert-confim.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';



@NgModule({
  declarations: [
    AlertSuccessComponent,
    AlertConfimComponent,
    ErrorMessagesComponent,
    MenuComponent,
    ToastMessageComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports:[
    AlertSuccessComponent,
    AlertConfimComponent,
    ErrorMessagesComponent,
    MenuComponent,
    ToastMessageComponent
  ]
})
export class ComponentsModule { }
