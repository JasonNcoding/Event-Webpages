import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  name: string = "";
  desc: string = "";
  startDateTime: Date = new Date();
  durationInMinutes: number = 0;
  isActive: boolean = true;
  image: string = "";
  capacity: number = 0;
  ticketAvailable: number = 0;
  categoriesList: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  saveEvent() {
    let eventDetails = {
      name: this.name,
      desc: this.desc,
      startDateTime: this.startDateTime,
      durationInMinutes: this.durationInMinutes,
      isActive: this.isActive,
      image: this.image ? this.image : undefined,
      capacity: this.capacity,
      ticketAvailable: this.ticketAvailable,
      categoriesList: this.categoriesList
    }

    this.dbService.addEvent(eventDetails).subscribe({
      next: (result) => { this.router.navigate(["event/list"]) },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }
}
