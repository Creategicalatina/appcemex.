import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   {
     path: 'main',
     loadChildren: () => import('./pages/layout/layout.module').then( m => m.LayoutPageModule),
     canLoad: [AuthGuard]
   },
  {
    path: 'login',
    loadChildren: () => import('./auth/pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'reset-password-email',
    loadChildren: () => import('./auth/pages/password/email/email.module').then( m => m.EmailPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'app',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canLoad:[AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./pages/profile/edit/edit.module').then( m => m.EditPageModule)
      },
      {
        path: 'update-archives',
        loadChildren: () => import('./pages/profile/update-archives/update-archives.module').then( m => m.UpdateArchivesPageModule)
      },
      {
        path: 'list-drivers',
        loadChildren: () => import('./pages/admin-logist/drivers/drivers/drivers.module').then( m => m.DriversPageModule),
        canLoad:[AuthGuard],
      },
      {
        path: 'list-travels',
        loadChildren: () => import('./pages/driver/travels/travels.module').then( m => m.TravelsPageModule),
        canLoad:[AuthGuard],
      },
    ]
  },

    {
      path: '',
      redirectTo: '/app/home',
      pathMatch: 'full'
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
