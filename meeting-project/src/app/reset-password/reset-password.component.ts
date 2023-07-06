import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  showDiv: boolean = false;
  showbtn: boolean = true;
  showbtn3: boolean = false;
  showUpdate: boolean = false;
  showForgot: boolean = true;
  form!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  error!: string;

  onSubmitUsername() {
    console.log(this.form.value);
    let username: any = { username: this.form.value.username };
    console.log(username, 'USERNAME'); //send username

    this.http
      .post(
        `${this.authservice.apiurl}/meets/forgot-password`,
        JSON.stringify(username)
      )
      .subscribe(
        (res: any) => {
          console.log(res, 'FORGOT PASSWORD');
          if (res.statusDesc === 'Your request processed successfully') {
            this.showDiv = true;
            this.showbtn = false;
          } else {
            this.error = res.statusDesc;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  errorMsg!: string;
  onSubmitOtp() {
    console.log(this.form.value);
    let value: any = {
      username: this.form.value.username,
      otp: Number(this.form.value.otp),
    };
    console.log(value, 'OTP');

    this.http
      .post(`${this.authservice.apiurl}/meets/otp-login`, JSON.stringify(value))
      .subscribe((res: any) => {
        console.log(res, 'OTP RESP');
        if (res.statusDesc === 'Bad Credentials.') {
          this.errorMsg = res.statusDesc;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.showbtn3 = true;
          this.showUpdate = true;
          this.showForgot = false;
          this.showbtn = false;
        }
      });
  }

  onSubmitPassword() {
    console.log(this.form.value);
    const Token = localStorage.getItem('token');
    let value: any = {
      // token: Token,
      password: this.form.value.password,
    };
    this.http
      .post(
        `${this.authservice.apiUrl}/user/password-change`,
        JSON.stringify(value)
      )
      .subscribe((res: any) => {
        console.log('PASSWORD', res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.router.navigate(['']);
        }
      });
  }
}
