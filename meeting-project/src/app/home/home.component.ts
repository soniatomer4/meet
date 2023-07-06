import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  opened: boolean | undefined;
  showFiller = false;
  sidenavOpened: boolean = true;
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authservice.getSidenavToggleState().subscribe((isopen: boolean) => {
      this.sidenavOpened = isopen;
    });
  }
  panelOpenState = false;
}
