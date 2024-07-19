import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g2',
  templateUrl: './stats-g2.component.html',
  styleUrls: ['./stats-g2.component.css']
})
export class StatsG2Component {
  createCount: number = 0
  updateCount: number = 0
  deleteCount: number = 0

  constructor(private dbService: DatabaseService, private router: Router) { }

  getCount() {
    this.dbService.getOperationCount().subscribe({
      next: (result: any) => { 
        this.createCount = result[0].numEvents ; 
        this.updateCount = result[1].numEvents ; 
        this.deleteCount = result[2].numEvents},
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  ngOnInit() {
    this.getCount();
  }
}
