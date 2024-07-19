import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-g1',
  templateUrl: './stats-g1.component.html',
  styleUrls: ['./stats-g1.component.css']
})
export class StatsG1Component implements OnInit {
  eventCount: number = 0
  categoryCount: number = 0

  constructor(private dbService: DatabaseService, private router: Router) { }

  getCount() {
    this.dbService.getCategoryCount().subscribe({
      next: (result: any) => { this.categoryCount = result.count },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })

    this.dbService.getEventCount().subscribe({
      next: (result: any) => { this.eventCount = result.count },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  ngOnInit() {
    this.getCount();
  }
}
