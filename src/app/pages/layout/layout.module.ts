import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LayoutPageRoutingModule } from './layout-routing.module';
import { CmxWebComponentsModule } from '@cmx-web-components/angular';

import { LayoutPage } from './layout.page';
import { ComponentsModule } from '../../components/components.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    LayoutPageRoutingModule,
    CmxWebComponentsModule.forRoot(),
  ],
  declarations: [LayoutPage]
})
export class LayoutPageModule {}
