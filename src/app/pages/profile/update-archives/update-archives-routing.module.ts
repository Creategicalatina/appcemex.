import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateArchivesPage } from './update-archives.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateArchivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateArchivesPageRoutingModule {}
