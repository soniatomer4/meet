import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  count: any;
  // user: any;
  totalUser: any;
  activeUser: any;
  totalMeeting: any;
  futureMeeting: any;
  todayMeeting: any;
  // meetings: Object;
  constructor(private authservice: AuthService, private http: HttpClient) {}
  ngOnInit() {
    // this.authservice.getUserdata();

    this.http.get(`${this.authservice.apiUrl}/admin/all-users`).subscribe(
      (res: any) => {
        console.log(res);
        this.totalUser = res.membersList.length;
        return this.totalUser;
      },
      (error) => console.log(error)
    );

    this.http
      .get(`${this.authservice.apiUrl}/user/active-users`)
      .subscribe((res: any) => {
        console.log(res);
        this.activeUser = res.count;
        return this.activeUser;
      });

    this.http
      .get(`${this.authservice.apiUrl}/user/all-meetings`)
      .subscribe((result: any) => {
        console.log(result);
        this.totalMeeting = result.allMeetings;
        this.futureMeeting = result.futureMeetings;
        this.todayMeeting = result.todayMeetings;

        return result;
      });
  }
}
