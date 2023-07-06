import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageMeetingComponent } from './manage-meeting/manage-meeting.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalanderComponent } from './calander/calander.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'meeting',
        component: ManageMeetingComponent,
      },
      {
        path: 'user',
        component: ManageUsersComponent,
      },
    ],
  },
  {
    path: 'resetpwd',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
