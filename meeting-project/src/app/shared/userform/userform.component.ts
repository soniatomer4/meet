import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {
  userform!: FormGroup;
  // update = this.authservice.update;
  update: boolean = false;
  constructor(
    // private snackBar: MatSnackBar,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private authservice: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.userform = this.formbuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.max(100)]],
      gender: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),

          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],

      role: ['', Validators.required],
    });

    if (this.data) {
      console.log('saj');
      this.userform.patchValue(this.data);
      this.update = true;
    }
  }
  create() {
    if (this.update) {
      this.authservice.updateUserData(this.userform.value);
      // this.snackBar.open('update', {
      //   duration: 2000,
      // });
    } else {
      console.log(this.userform.value);
      this.authservice.postUserData(this.userform.value);
    }
  }
}
