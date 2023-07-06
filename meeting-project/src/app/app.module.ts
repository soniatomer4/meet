import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RequestInterceptor } from './service/request.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CalanderComponent } from './calander/calander.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './service/header.interceptor';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageMeetingComponent } from './manage-meeting/manage-meeting.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { LabelModule } from '@progress/kendo-angular-label';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
// import { MatCarouselModule } from '@ngmodule/material-carousel';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    ManageUsersComponent,
    CalanderComponent,
    ManageMeetingComponent,
    ResetPasswordComponent,
    HeaderComponent,
    SidenavComponent,
    NotificationComponent,
    ProfileComponent,
    ProfileEditComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    SchedulerModule,
    LabelModule,
  ],
  exports: [MaterialModule],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
