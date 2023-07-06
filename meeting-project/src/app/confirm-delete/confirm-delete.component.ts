import { Component, Inject, Injectable, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../manage-users/manage-users.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  user: PeriodicElement[] = [];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private username: any
  ) {}
  // username:any;
  deleteUser() {
    this.http
      .post(
        `${this.authservice.apiUrl}/admin/delete-member`,
        JSON.stringify(this.username)
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.http
      .get(`${this.authservice.apiUrl}/admin/all-users`)
      .subscribe((res: any) => {
        // console.log(res.membersList);
        this.user = res.membersList;
        console.log(this.user);
        console.log(this.user[0].name);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.user);
        this.dataSource.paginator = this.paginator;
      });
  }
}
