import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  eventName: string = "";
  eventCapacity: number = 0;
  eventId: string = "";

  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  onGetEvent() {
    return this.dbService.listEvent().subscribe({
      next: (result: any) => { this.events = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  onSelectUpdate(item:any) {
    this.eventName = item.name;
    this.eventCapacity = item.capacity;
    this.eventId = item.eventId;
  }
  onUpdateEvent() {
    let obj = { eventId: this.eventId, name: this.eventName, capacity: this.eventCapacity };
    this.dbService.updateEvent(obj).subscribe({
      next: (result) => {
        this.onGetEvent();
        this.router.navigate(["event/list"])
      },
      error: (error) => { this.router.navigate(["/invalid"]) }
    });

  }

  ngOnInit() {
    this.onGetEvent()
  }
}
