import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../../services/database.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: any

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  onViewEvent(eventId:string) {
    this.router.navigate([`event/view-event/${eventId}`])
  }
  
  /**
   * Get category upon initialisation
   */
  ngOnInit() {
    let categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    this.dbService.getCategory(categoryId).subscribe({
      next: (result: any) => { this.category = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    });
  }
}
