import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  selectedValue!: string;
  selected = '';
  genders: any = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
    { value: 'Others', viewValue: 'Others' },
  ];

  userEditform!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    private http: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  hide = true;
  ngOnInit() {
    console.log('data', this.data);

    this.userEditform = this.formbuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
    });
    if (this.data) {
      console.log('saj');
      this.userEditform.patchValue(this.data);
    }
  }
  submit() {
    console.log(this.userEditform.value);
    // this.authservice.getSigninStatus(this.userEditform.value);
    this.http
      .post(
        `${this.authservice.apiUrl}/user/profile-update`,
        this.userEditform.value
      )
      .subscribe((res: any) => {
        console.log(res);
        return res;
      });
  }
}
