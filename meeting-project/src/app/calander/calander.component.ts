import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MbscCalendarEvent,
  MbscDatepickerOptions,
  MbscEventcalendarOptions,
  MbscPopup,
  MbscPopupOptions,
  Notifications,
  setOptions,
} from '@mobiscroll/angular';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment-timezone';

setOptions({
  theme: 'ios',
  themeVariant: 'light',
});

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss'],
  providers: [Notifications],
})
export class CalanderComponent implements OnInit {
  // moment.tz.setDefault('Asia/Kolkata');

  meeting: any;
  constructor(
    private notify: Notifications,
    private service: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get(`${this.service.apiUrl}/user/profile`).subscribe(
      (result: any) => {
        console.log(result);
        this.meeting = result.meetings;
        console.log(this.meeting);
        this.myEvents = this.meeting;
      },
      (error) => console.log(error)
    );
    this.http
      .get(`${this.service.apiUrl}/admin/all-users`)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  @ViewChild('colorPicker', { static: false })
  colorPicker: any;
  popupEventTitle: string | undefined;
  popupEventDescription = '';
  popupEventAllDay = true;
  popupEventDates: any;
  popupEventStatus = 'busy';
  calendarSelectedDate: any = new Date();
  switchLabel: any = 'All-day';
  tempColor = '';
  selectedColor = '';
  colorAnchor: HTMLElement | undefined;
  membersUsername: any;
  consecutive!: number;
  colors = [
    '#ffeb3c',
    '#ff9900',
    '#f44437',
    '#ea1e63',
    '#9c26b0',
    '#3f51b5',
    '',
    '#009788',
    '#4baf4f',
    '#7e5d4e',
  ];
  myEvents: MbscCalendarEvent[] = [];
  tempEvent!: MbscCalendarEvent;
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'single',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      calendar: { type: 'month', labels: true },
    },
    onEventClick: (args) => {
      this.isEdit = true;
      this.tempEvent = args.event;
      // fill popup form with event data
      this.loadPopupForm(args.event);
      // set popup options
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      // open the popup
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        // fill popup form with event data
        this.loadPopupForm(args.event);
        // set popup options
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        // open the popup
        this.popup.open();
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    },
    onEventUpdated: (args) => {
      // here you can update the event in your storage as well, after drag & drop or resize
      // ...
    },
  };
  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;

  popupAddButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Add',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupEditButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Save',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupButtons: any = [];
  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        this.myEvents = [...this.myEvents];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    },
  };
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false,
    },
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false,
    },
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true,
  };
  isEdit = false;
  colorOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    showArrow: false,
    showOverlay: false,
    buttons: [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: (ev) => {
          this.selectedColor = this.tempColor;
          this.colorPicker.close();
        },
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    responsive: {
      medium: {
        display: 'anchored',
        buttons: [],
      },
    },
  };
  loadPopupForm(event: MbscCalendarEvent): void {
    this.popupEventTitle = event.title;
    this.popupEventDescription = event['description'];
    this.popupEventDates = [event.start, event.end];
    this.popupEventAllDay = event.allDay || false;
    // this.popupEventStatus = event['status'] || 'busy';
    // this.selectedColor = event.color || '';
  }
  saveEvent(): void {
    this.tempEvent.title = this.popupEventTitle;
    this.tempEvent['description'] = this.popupEventDescription;
    this.tempEvent.start = this.popupEventDates[0]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);
    this.tempEvent.end = this.popupEventDates[1]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);
    this.tempEvent.allDay = this.popupEventAllDay;
    // this.tempEvent['status'] = this.popupEventStatus;
    // this.tempEvent.color = this.selectedColor;
    // this.tempEvent['status'] = this.popupEventStatus;
    // this.tempEvent.color = this.selectedColor;
    this.tempEvent['membersUsername'] = this.membersUsername;
    this.tempEvent['consecutive'] = this.consecutive;
    // console.log(typeof this.popupEventDates[0]);
    console.log(this.tempEvent['consecutive']);
    this.service.createmeeting(this.tempEvent);

    if (this.isEdit) {
      // update the event in the list
      this.myEvents = [...this.myEvents];
      this.http
        .post(
          `${this.service.apiUrl}/user/update-meeting`,
          JSON.stringify(this.tempEvent)
        )
        .subscribe(
          (result: any) => {
            console.log(result);
            console.log('gjkk');
            console.log(this.tempEvent);
          },
          (error) => console.log(error)
        );
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      this.myEvents = [...this.myEvents, this.tempEvent];
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar

    this.calendarSelectedDate = this.popupEventDates[0];
    // close the popup
    this.popup.close();
  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.myEvents = this.myEvents.filter((item) => item.id !== event.id);
    this.notify.snackbar({
      button: {
        action: () => {
          this.myEvents = [...this.myEvents, event];
        },
        text: 'Undo',
      },
      message: 'Event deleted',
    });

    // here you can delete the event from your storage as well
    // ...

    delete event.id;

    console.log(event['meetid']);
    let meetId: any = { meetid: event['meetid'] };

    this.http
      .post(
        `${this.service.apiUrl}/user/delete-meeting`,
        JSON.stringify(meetId)
      )
      .subscribe(
        (result: any) => {
          console.log(result);
        },
        (error) => console.log(error)
      );
  }
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
  }

  selectColor(color: string): void {
    this.tempColor = color;
  }

  openColorPicker(ev: any): void {
    this.selectColor(this.selectedColor || '');
    this.colorAnchor = ev.currentTarget;
    this.colorPicker.open();
  }

  changeColor(ev: any): void {
    const color = ev.currentTarget.getAttribute('data-value');
    this.selectColor(color);

    if (!this.colorPicker.s.buttons.length) {
      this.selectedColor = color;
      this.colorPicker.close();
    }
  }
  myData = ['Sonia', 'Amita', 'Tushar', 'Aman', 'Kavya', 'Moksh'];
  days = ['1', '2', '3'];
}
