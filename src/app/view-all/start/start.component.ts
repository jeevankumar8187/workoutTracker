import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkoutService } from 'src/app/workout.service';
import { Workout } from '../Workout';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute) {

    //this.dateFormat(this.now.toTimeString(),"shortDate");
    //console.log(this.dateFormat(this.now,"IsoDate"));
    // console.log(this.now.toDateString());
    //console.log(""+this.now.getHours()+" : "+this.now.getMinutes()+" : "+this.now.getSeconds());
    this.startDate = this.now.toDateString();
    this.startTime = "" + this.now.getHours() + " : " + this.now.getMinutes() + " : " + this.now.getSeconds();
    console.log(this.now.toUTCString());
    this.startTimeFormat = JSON.stringify(this.now);
   // this.startTimeFormat = this.now.getFullYear()+"-0"+this.now.getMonth()+"-"+this.now.getDate()+"T"+this.now.getHours()+":"+this.now.getMinutes()+":"+this.now.getSeconds();
   // console.log(this.startTimeFormat);
  }
  workoutTitle: String;
  workoutNote: string;
  workout ;
  workoutId;
  startTime;
  startDate ;//= require('dateformat');
  //dateFormat = require('dateformat');
  now = new Date();
  startTimeFormat;

  ngOnInit() {
    this.getWorkout();
  }

  getWorkout() {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.workoutService.getWorkoutById(this.workoutId).subscribe((result) => {
      this.workout = result;
      this.workoutTitle = this.workout.workoutTitle;
      this.workoutService.getWorkoutByTitle(this.workoutTitle).subscribe((result) =>{
        this.workout = result;
      })
    })

  }

  // updateStart() {
  //   this.workoutId = this.route.snapshot.paramMap.get('id');
  //    var json = "\"+this.startTimeFormat\"";
  //   let workout = {id: this.workout.id, workoutTitle: this.workout.workoutTitle, workoutNote: this.workout.workoutNote, caloriesBurntPerMin: this.workout.caloriesBurntPerMin,
  //                  categories: this.workout.categories,info:[{startTime:new this.startTimeFormat,startDate:new Date()}]};
  //   console.log(workout.info);
  //   this.workoutService.addWorkout(workout).subscribe((result) => {
  //     this.workoutService.getAllWorkouts();
  //   });

  // }

}
