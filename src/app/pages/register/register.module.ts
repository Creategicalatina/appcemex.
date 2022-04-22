import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ArchivesRegisterComponent } from './components/archives-register/archives-register.component';
import { RegisterMantruckComponent } from './components/register-mantruck/register-mantruck.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RegisterAdminLogistThirdComponent } from './components/register-admin-logist-third/register-admin-logist-third.component';
import { RegisterDriverComponent } from './components/register-driver/register-driver.component';
import { PhotoDrivingLicenceComponent } from './components/register-driver/photo-driving-licence/photo-driving-licence.component';
import { PhotoIndentityCardComponent } from './components/photo-indentity-card/photo-indentity-card.component';
import { DocumentCompanyComponent } from './components/document-company/document-company.component';
import { SecurityCardComponent } from './components/register-driver/security-card/security-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule
  ],
  declarations: [
    RegisterPage,
    PhotoDrivingLicenceComponent,
    PhotoIndentityCardComponent,
    SecurityCardComponent,
    DocumentCompanyComponent,
    RegisterDriverComponent,
    RegisterMantruckComponent,
    ArchivesRegisterComponent,
    RegisterAdminLogistThirdComponent,
  ]
})
export class RegisterPageModule {}
