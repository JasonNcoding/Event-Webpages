import { Component } from '@angular/core';
import { DatabaseService } from "../../../services/database.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  categories: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  /**
   * Method to get all categories upon initialisation
   */
  ngOnInit() {
    this.dbService.listCategories().subscribe({
      next: (result: any) => { this.categories = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  onViewCategory(categoryId: string) {
    this.router.navigate([`category/${categoryId}`])
  }

}
