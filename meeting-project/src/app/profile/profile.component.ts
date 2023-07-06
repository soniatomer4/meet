import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: any;
  age!: number;
  gender: any;
  emailid: any;
  role: any;
  values: any;
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.http
      .get(`${this.authservice.apiUrl}/user/profile`)
      .subscribe((res: any) => {
        // this.name=res.username;
        console.log(res);
        this.name = res['name'];
        this.age = res['age'];
        this.gender = res['gender'];
        this.emailid = res['email'];
        console.log(res['email']);
        this.values = res;
        return res;
      });
    this.role = localStorage.getItem('role');
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data,

      position: { top: '4.5rem', right: '1rem' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
}
