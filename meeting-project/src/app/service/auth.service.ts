import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public sideNavToggleSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private apiurlLogin = 'http://192.168.0.65:9090/meets/login';
  private member = 'http://192.168.0.65:9090/meets/api-v1/user/member';
  public apiUrl = 'http://192.168.0.65:9090/meets/api-v1';

  public apiurl = 'http://192.168.0.65:9090';
  user: any;
  update: any = false;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  gettoken() {
    return localStorage.getItem('token');
  }

  usersignin(data: object) {
    try {
      this.http
        .post(`${this.apiurlLogin}`, JSON.stringify(data))
        .subscribe((res: any) => {
          console.log(res['token'], 'no TOKEN');
          localStorage.setItem('token', res['token']);
        });
    } catch (error) {
      console.log('An exception occurred:', error);
    }
  }

  getauthstatus() {
    var token = localStorage.getItem('token');
    if (!!token) {
      return true;
    } else {
      return false;
    }
  }

  postUserData(data: any) {
    return this.http
      .post(`${this.apiUrl}/admin/register-member`, JSON.stringify(data))
      .subscribe((res: any) => {
        console.log(res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.snackBar.open('User Added!', 'Close', {
            duration: 3500,
          });
        }
      });
  }

  updateUserData(data: any) {
    console.log('jdh');
    return this.http
      .post(`${this.apiUrl}/admin/update-member`, JSON.stringify(data))
      .subscribe((res: any) => {
        console.log(res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.snackBar.open('User Added!', 'Close', {
            duration: 3500,
          });
        }
      });
  }

  /////////////////////////
  token: any;
  getSigninStatus(data: object) {
    this.http
      .post(`${this.apiurlLogin}`, JSON.stringify(data))
      .subscribe((res: any) => {
        console.log(res);
        console.log(res['token']);
        localStorage.setItem('token', res['token']);
        localStorage.setItem('role', res.role);

        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
        }
        return res;
      });
  }
  getUserdata() {
    this.http.get(`${this.apiurl}/admin/all-users`).subscribe(
      (res: any) => {
        console.log(res);
        this.user = res.membersList;
        return this.user;
      },
      (error) => console.log(error)
    );
  }
  public clear() {
    localStorage.clear();
  }

  members(data: object) {
    this.http
      .post(`${this.apiurl}/meets/api-v1/user/member`, JSON.stringify(data))
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  createmeeting(data: any) {
    this.http
      .post(`${this.apiUrl}/user/register-meeting`, JSON.stringify(data))
      .subscribe((result: any) => {
        console.log(data);
        console.log(result);
      });
  }
  deleteUser(data: any) {
    this.http
      .post(`${this.apiUrl}/admin/delete-member`, JSON.stringify(data))
      .subscribe((res) => {
        console.log(res);
      });
  }
  toggle() {
    console.log('jsdh');
    return this.sideNavToggleSubject.next(!this.sideNavToggleSubject.value);
  }
  getSidenavToggleState() {
    return this.sideNavToggleSubject.asObservable();
  }
  getUserProfile() {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }
}
