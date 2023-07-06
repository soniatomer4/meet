import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NotificationComponent } from '../notification/notification.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  count!: any;
  notifications!: any;

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.authservice.getUserProfile().subscribe((res: any) => {
      this.notifications = res.notifications;
      this.count = this.notifications.length;
      console.log(res.notifications);
      return this.notifications;
    });
  }

  toggleSidenav() {
    this.authservice.toggle();
  }

  openDialogNotification() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      height: '90%',
      width: '40%',
      position: { top: '4.5rem', right: '0px', bottom: '0px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      height: '50%',
      width: '30%',
      position: { top: '4.5rem', right: '1rem' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logout() {
    console.log(localStorage.getItem('token'));
    const data = localStorage.getItem('token');
    this.http
      .post(`${this.authservice.apiUrl}/user/logout`, JSON.stringify(data))
      .subscribe((res: any) => {
        console.log(res);
        return res;
      });
    this.authservice.clear();
    this.router.navigate(['/signin']);
  }
}
