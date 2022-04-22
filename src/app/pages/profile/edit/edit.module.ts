import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { EditAdminLogisThirdComponent } from './edit-admin-logis-third/edit-admin-logis-third.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditPageRoutingModule
  ],
  declarations: [
    EditPage,
    EditAdminLogisThirdComponent
  ]
})
export class EditPageModule {}
