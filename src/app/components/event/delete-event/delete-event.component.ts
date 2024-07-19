import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  onGetEvent() {
    return this.dbService.listEvent().subscribe({
      next: (result: any) => { this.events = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  onDeleteEvent(item: any) {
    this.dbService.deleteEvent(item.eventId).subscribe({
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
