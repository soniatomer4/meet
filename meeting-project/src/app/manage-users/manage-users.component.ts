import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserformComponent } from '../shared/userform/userform.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
export interface PeriodicElement {
  name: string;
  age: number;
  gender: string;
  email: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  update: boolean = false;
  user: PeriodicElement[] = [];
  dataSource: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private authservice: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.http
      .get(`${this.authservice.apiUrl}/admin/all-users`)
      .subscribe((res: any) => {
        this.user = res.membersList;
        console.log(this.user);
        console.log(this.user[0].name);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.user);
        this.dataSource.paginator = this.paginator;
      });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ///////////////dialog box//////////

  openDialog() {
    const dialogRef = this.dialog.open(UserformComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogConfirm(username: any) {
    let data = { username: username };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editUser(data: any) {
    // Logic for editing user
    this.authservice.update = true;
    this.dialog.open(UserformComponent, { data });
  }

  openSnackBar(message: string, action: string) {}
}
