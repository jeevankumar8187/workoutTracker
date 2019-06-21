import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from './Workout';
import { Info } from './info';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  constructor(private workoutService:WorkoutService) { 
    this.search=false;
  }
  workouts : Workout[];
  optionalWorkouts:Workout[];
  search:boolean=false;
  text;
  show : boolean = false;
  ngOnInit() {
    
    this.workoutService.getAllWorkouts().subscribe((result)=>{
      this.workouts=result;
    });
  }
  
  deleteWorkout(workout:any){
    this.workoutService.deleteWorkout(workout).subscribe((result)=>{
      this.workoutService.getAllWorkouts().subscribe((result)=>{this.workouts=result});
    });
  }

  // show(val1 : any,val2:any) {
  //   console.log(val1 +""+val2 );
  //   document.getElementById(val1).disabled=true;
  //   document.getElementById(val2).disabled=false;

  //   //document.getElementByName("val").disabled = true;
  // }
  findByWorkout(){
    this.search=true;
    this.workoutService.getWorkoutByTitle(this.text).subscribe((result)=>{
      this.optionalWorkouts=[];
      this.optionalWorkouts.push(result);
    });
  }



  updateStart(id : any) {
    this.show = true;
    this.workoutService.startWorkout(id).subscribe((result) => {});
  }

  updateEnd(id : any) {
    this.show = false;
    this.workoutService.endWorkout(id).subscribe((result) => {});
  }

  
  // updateStart(id : any) {
  //   var workout:Workout;
  //   console.log(id);
  //   this.workoutService.getWorkoutById(id).subscribe((result) =>{
  //     workout= result;
  //     console.log(workout);
  //   var now = new Date();
  //   var startDate = now.getFullYear()+"-0"+now.getMonth()+"-"+now.getDate();
  //   var info : Info = {startDate: startDate, startTime:now, endDate:startDate, endTime:now,caloriesBurntPerDay:0,status:null};
  //   console.log(info);
  //   workout.info.push(info);
  //   console.log(workout);
  //   this.workoutService.updateWorkout(workout).subscribe((result) => {
  //     console.log(JSON.stringify(result) )
  //   })
  //   });

  // }

  // updateEnd(id : any) {
  //   var workout:Workout;
  //   console.log(id);
  //   this.workoutService.getWorkoutById(id).subscribe((result) =>{
  //     workout= result;
  //     console.log(workout);
  //   var now = new Date();
  //   var month = now.getMonth()+1;
  //   console.log(month);
  //   var endDate = now.getFullYear()+"-"+month+"-"+now.getDate();
  //   var str1 = ""+now;
  //   var str2 = ""+workout.info[workout.info.length-1].startTime;
  //   var h2 = parseInt(str2.substring(10,13));
  //   var h1 = parseInt(str1.substring(10,13));
  //   var m2 = parseInt(str2.substring(13,16));
  //   var m1 = parseInt(str1.substring(13,16));
  //   var calaries = ((h2 - h1)*60 + Math.abs(m2 - m1))*workout.caloriesBurntPerMin;
  //   console.log(calaries);
  //   var info : Info = {startDate: workout.info[workout.info.length-1].startDate, startTime:workout.info[workout.info.length-1].startTime, endDate:endDate, endTime:now, caloriesBurntPerDay:calaries,status:true};
  //   console.log(info);
  //   workout.info.reverse[0]= info;
  //   console.log(workout);
  //   this.workoutService.addWorkout(workout).subscribe((result) => {
  //     console.log("final "+JSON.stringify(result));
  //   })
  //   }); 

  // }

}
