import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DocumentIdentityCardComponent } from './modal-document-identity-card/document-identity-card/document-identity-card.component';
// eslint-disable-next-line max-len
import { DocumentDrivingLicenceComponent } from './modal-document-driving-licence/document-driving-licence/document-driving-licence.component';
import { DocumentCompanyComponent } from './modal-document-company/document-company/document-company.component';
import { DocumentSecurityCardComponent } from './modal-security-card/document-security-card/document-security-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    ProfilePage,
    DocumentCompanyComponent,
    DocumentIdentityCardComponent,
    DocumentDrivingLicenceComponent,
    DocumentSecurityCardComponent,
  ]
})
export class ProfilePageModule {}
