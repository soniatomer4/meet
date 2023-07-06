import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { race } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginform!: FormGroup;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authservice: AuthService
  ) {}
  hide = true;
  ngOnInit() {
    this.loginform = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onsubmit() {
    this.authservice.getSigninStatus(this.loginform.value);
  }
}
