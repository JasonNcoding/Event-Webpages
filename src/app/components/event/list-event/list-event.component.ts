import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router ) {}

  onViewEvent(eventId:string) {
    this.router.navigate([`event/view-event/${eventId}`])
  }

  ngOnInit() {
    this.dbService.listEvent().subscribe({
      next: (result: any) => { this.events = result},
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }
}
