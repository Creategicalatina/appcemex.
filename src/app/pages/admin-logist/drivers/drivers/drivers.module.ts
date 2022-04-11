import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriversPageRoutingModule } from './drivers-routing.module';

import { DriversPage } from './drivers.page';
import { CmxWebComponentsModule } from '@cmx-web-components/angular';
import { ComponentsModule } from '../../../../components/components.module';
import { LayoutPage } from '../../../layout/layout.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CmxWebComponentsModule.forRoot(),
    DriversPageRoutingModule
  ],
  declarations: [DriversPage, LayoutPage]
})
export class DriversPageModule {}
