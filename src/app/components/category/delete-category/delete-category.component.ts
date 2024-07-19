import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  categories: any[] = [];
  deleteCategoryId: string = "";


  constructor(private dbService: DatabaseService, private router: Router) { }

  /**
   * Method to delete category by id using db service
   * @param categoryId id to be deleted
   */
  deleteCategory(categoryId: string) {
    this.dbService.deleteCategory(categoryId).subscribe({
      next: (result) => { this.listCategories() },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  /**
   * Method to get all categories
   */
  listCategories() {
    this.dbService.listCategories().subscribe({
      next: (result: any) => { this.categories = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  /**
 * Method to get all categories upon initialisation
 */
  ngOnInit() {
    this.listCategories();
  }
}
