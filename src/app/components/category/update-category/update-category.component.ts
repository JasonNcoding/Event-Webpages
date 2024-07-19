import { Component } from '@angular/core';
import { DatabaseService } from "../../../services/database.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categories: any[] = [];
  updateCategory: any;
  
  updateCatName: string = ""
  updateCatDesc: string = ""
  updateCatImageUrl: string = ""


  constructor(private dbService: DatabaseService, private router: Router) { }

  /**
   * Method to get all categories
   */
  listCategories() {
    this.dbService.listCategories().subscribe({
      next: (result: any) => { this.categories = result },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  saveCategory() {
    let update = {
      categoryId: this.updateCategory.categoryId,
      name: this.updateCatName,
      description: this.updateCatDesc,
      imageUrl: this.updateCatImageUrl
    }
    this.dbService.updateCategory(update).subscribe({
      next: (result: any) => { this.listCategories() },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }

  /**
   * Method to get all categories upon initialisation
   */
  ngOnInit() {
    this.listCategories();
  }

  onSelectCategory(categoryId: string) {
    this.categories.forEach((record) => {
      if (record.categoryId === categoryId) {
        this.updateCategory = record;
        this.updateCatName = this.updateCategory.name
        this.updateCatDesc = this.updateCategory.description
        this.updateCatImageUrl = this.updateCategory.imageUrl
      }
    })
  }
}
