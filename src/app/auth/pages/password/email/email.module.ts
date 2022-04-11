import { NgModule } from '@angular/core';
import { EmailPage } from './email.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmailPageRoutingModule } from './email-routing.module';
import { ComponentsModule } from '../../../../components/components.module';
import { ErrorMessagesComponent } from 'src/app/utilities/error-messages/error-messages.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EmailPageRoutingModule
  ],
  declarations: [EmailPage, ErrorMessagesComponent]
})
export class EmailPageModule {}
