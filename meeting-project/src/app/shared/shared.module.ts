import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { Error500Component } from './error500/error500.component';
import { Error404Component } from './error404/error404.component';
import { UserformComponent } from './userform/userform.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: 'error500', component: Error500Component },
  { path: 'error404', component: Error404Component },
];

@NgModule({
  declarations: [
    DashboardComponent,
    Error500Component,
    Error404Component,
    UserformComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
