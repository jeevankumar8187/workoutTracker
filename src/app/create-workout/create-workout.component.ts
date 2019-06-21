import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { CategoryService } from '../category.service';
import { Workout } from '../view-all/Workout';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {
  

  constructor(private categoryService:CategoryService,private workoutService : WorkoutService) { }

  workoutTitle:string;
  workoutNote:string;
  caloriesBurntPerMin:number;
  data:string[] = new Array() ;
  //uuidValue:string;
 
  dropdownList=new Array() ;
  selectedItems = [];
  dropdownSettings = {};
  status:boolean= true;
  ngOnInit() {
    this.getDropDown();
    
   this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll :false,
      idField: '_id',
      textField: 'categoryName',
      itemsShowLimit: 3,
      maxHeight: 80,
      allowSearchFilter: true
      
    };

  }

  // generateUUID(){
  //   this.uuidValue=UUID.UUID();
  //   return this.uuidValue;
  // }

  getDropDown() {
    this.categoryService.getAllCategories().subscribe((result)=> { this.dropdownList = result
      console.log(this.dropdownList);
      console.log(this.dropdownList[0].categoryName);
      for(var i=0; i<this.dropdownList.length; i++) {
        this.data[i] = this.dropdownList[i].categoryName;
      }
       console.log(this.data);
     });
    }
  
   

  addWorkout(){

    let workout ={workoutTitle:this.workoutTitle,workoutNote:this.workoutNote,caloriesBurntPerMin:this.caloriesBurntPerMin,categories:this.selectedItems,info:[]};
    this.workoutService.addWorkout(workout).subscribe((result) => {
      console.log(result);
      this.workoutService.getAllWorkouts();
        document.getElementById("msg").innerHTML="Added Successfully"
    } );
   

  }
  

}
