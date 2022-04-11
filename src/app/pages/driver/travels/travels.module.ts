import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelsPageRoutingModule } from './travels-routing.module';

import { TravelsPage } from './travels.page';
import { ComponentsModule } from '../../../components/components.module';
import { LayoutPage } from '../../layout/layout.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TravelsPageRoutingModule
  ],
  declarations: [TravelsPage, LayoutPage]
})
export class TravelsPageModule {}
