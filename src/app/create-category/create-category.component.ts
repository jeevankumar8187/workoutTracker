import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from './Category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  msg: String;

  constructor(private categoryService:CategoryService) { }
  categories : Category[];
  optionCategories:Category[];
  categoryName:string;
  status:boolean=false;
  category;
  text;
  ngOnInit() {
    this.getCategories();

  }
 getCategories(){
  this.categoryService.getAllCategories().subscribe((result) => {
    this.categories=result;
    this.optionCategories=result;
  });
 }

  addCategory(){
    var category  = new Category();
    category.categoryName = this.categoryName;
    this.categoryService.addCategory(category).subscribe(
     (data)=>{this.msg = data;
      this.categoryService.getAllCategories().subscribe((result) => this.categories=result
      );
  
     });
    
  }

  deleteCategory(category:Category){
    this.categoryService.deleteCategory(category._id).subscribe(()=>{
      this.ngOnInit();
    });
  
  }
  findByCategory(){
    var newCategories:Category[];
    var category :Category;
    this.categoryService.getCategoryByName(this.text).subscribe((result)=>{
      console.log(result);
     
      this.categories = [];
      this.categories.push(result);
    }
    )

  }


  isEmpty(){
    if(this.categoryName != ""){
      this.status= false;
    }
  }
  editCategory(id : any) {
    this.categoryService.getCategoryById(id).subscribe((result) =>{
      this.category = result;
      this.categoryName = this.category.categoryName;
    });
   // document.getElementById("update").disabled = false;
  }



  updateCategory() {
    var updateCategory;
    this.categoryService.getCategoryById(this.category._id).subscribe((result) =>{
      updateCategory = result;
      updateCategory.categoryName = this.categoryName;
      this.categoryService.updateCategory(updateCategory).subscribe((result) => {});
      this.categoryService.getAllCategories().subscribe((result) => this.categories=result)
    });


  }

}
