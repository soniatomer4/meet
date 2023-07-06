import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification: any;
  constructor(private http: HttpClient, private authservice: AuthService) {}
  ngOnInit() {
    this.authservice.getUserProfile().subscribe((res: any) => {
      console.log(res);
      console.log(res.notifications);
      this.notification = res.notifications;
      console.log(typeof this.notification);
      return res.notifications;
    });
  }
}
