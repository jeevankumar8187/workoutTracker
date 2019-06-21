import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/workout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {


  constructor(private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute) {

    //this.dateFormat(this.now.toTimeString(),"shortDate");
    // console.log(this.dateFormat(this.now));
    // console.log(this.now.toDateString());
    //console.log(""+this.now.getHours()+" : "+this.now.getMinutes()+" : "+this.now.getSeconds());
    this.startDate = this.now.toDateString();
    this.startTime = "" + this.now.getHours() + " : " + this.now.getMinutes() + " : " + this.now.getSeconds();
  }
  workoutTitle: string;
  workoutNote: string;
  workout;
  workoutId;
  startTime;
  startDate: any;// = require('dateformat');
//  dateFormat = require('dateformat');
  now = new Date();

  ngOnInit() {
    this.getWorkout();
  }

  getWorkout() {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    console.log(this.workoutId);
    this.workoutService.getWorkoutById(this.workoutId).subscribe((result) => {
      this.workout = result;
      this.workoutTitle = this.workout.workoutTitle;
    })

  }

  // updateStart() {
  //   this.workoutId = this.route.snapshot.paramMap.get('id');
  //    console.log(this.workoutId+"jhguk");
  //   let workout = {id: this.workoutId, workoutTitle: this.workoutTitle, workoutNote: this.workoutNote, caloriesBurntPerMin: parseFloat(this.workout.caloriesBurntPerMin), categories: this.workout.selectedItems,info:[{startTime:new Date(),startDate:new Date()}]};
  //   console.log(workout);
  //   this.workoutService.addWorkout(workout).subscribe((result) => {
  //     this.workoutService.getAllWorkouts();
  //   });

  // }

}
