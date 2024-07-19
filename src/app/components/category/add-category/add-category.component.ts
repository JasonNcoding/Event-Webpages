import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  
  name: string = "";
  description: string = "";
  imageUrl: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { }

  /**
   * Method to add category by calling db service
   */
  saveCategory() {
    let categoryDetails = {
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl ? this.imageUrl : undefined
    };

    this.dbService.addCategory(categoryDetails).subscribe({
      next: (result) => { this.router.navigate(["category/list"]) },
      error: (error) => { this.router.navigate(["/invalid"]) }
    })
  }
}
