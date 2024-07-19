import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event: any;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Get event upon initialisation
   */
  ngOnInit() {
    let eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.dbService.viewEvent(eventId).subscribe({
      next: (result: any) => { this.event = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    });
  }
}
