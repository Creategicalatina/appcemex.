import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { UpdateArchivesPageRoutingModule } from './update-archives-routing.module';

import { UpdateArchivesPage } from './update-archives.page';
import { PhotoLicenceDocumentComponent } from './components/photo-licence-document/photo-licence-document.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PhotoIdentityCardComponent } from './components/photo-identity-card/photo-identity-card.component';
import { PhotoDocumentCompanyComponent } from './components/photo-document-company/photo-document-company.component';
import { PhotoSecurityCardComponent } from './components/photo-security-card/photo-security-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    UpdateArchivesPageRoutingModule
  ],
  declarations: [
    UpdateArchivesPage,
    PhotoLicenceDocumentComponent,
    PhotoIdentityCardComponent,
    PhotoDocumentCompanyComponent,
    PhotoSecurityCardComponent
  ]
})
export class UpdateArchivesPageModule {}
