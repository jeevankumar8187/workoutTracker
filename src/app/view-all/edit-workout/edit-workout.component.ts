import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { WorkoutService } from 'src/app/workout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  constructor(private categoryService:CategoryService,
              private workoutService : WorkoutService,
              private router:Router,
              private route:ActivatedRoute, ) { }

  workoutTitle:string;
  workoutNote:string;
  caloriesBurntPerMin:number;
  data:string[] = new Array() ;
 
  dropdownList=new Array() ;
  selectedItems = [];
  dropdownSettings = {};
  status:boolean= true;
  workout;
  workoutId;
  ngOnInit() {
    this.getDropDown();
    this.getWorkout();
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

  getWorkout(){
    var id = this.route.snapshot.paramMap.get('id'); 
    console.log("id  ="+id);
    this.workoutService.getWorkoutById(id).subscribe((result)=> {
     this.workout = result;
    console.log(result);
  });

   }

  getDropDown() {
    this.categoryService.getAllCategories().subscribe((result)=> { this.dropdownList = result
      console.log(this.dropdownList);
      console.log(this.dropdownList[0].categoryName);
      for(var i=0; i<this.dropdownList.length; i++) {
        this.data[i] = this.dropdownList[i].categoryName;
      }
     });
    }
  
   

  updateWorkout(){
    this.workoutId=this.route.snapshot.paramMap.get('id');
   // console.log(this.workoutId+"jhguk");
    let workout ={id:this.workoutId, workoutTitle:this.workoutTitle,workoutNote:this.workoutNote,caloriesBurntPerMin:this.caloriesBurntPerMin,categories:this.selectedItems};
    console.log(workout);
    this.workoutService.addWorkout(workout).subscribe((result) => {
      this.workoutService.getAllWorkouts();
    } );

  }
  }
  

