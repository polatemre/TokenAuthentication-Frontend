import { AuthLayoutComponent } from './components/app/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './components/app/layouts/dashboard-layout/dashboard-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { UserComponent } from './components/admin/user/user.component';

const routes: Routes = [
  // App Routes
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/app/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [LoginGuard]
      }
    ]
  },

  // Auth Routes
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      redirectTo: '/auth',
      pathMatch: 'full'
    }]
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/app/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
