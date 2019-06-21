import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../view-all/Workout';
import { Info } from '../view-all/info';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  constructor(private workoutService: WorkoutService) { }
  workouts = [];
  output = [];
  details = [];
  show:boolean = false;
  info: Info;
  totalCalories : any;
  check : boolean;
  showRange : boolean = false;
  always : boolean = true;  
  today : any;
  ngOnInit() {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getAllWorkouts().subscribe((result) => {
      this.workouts = result;
      console.log(this.workouts);
    this.report(0);
    })
  }



  // getDate(val :any) {
  //   //var date = new Date(val);
  //   console.log(val+"hjhj");
  //   this.show = true;
  //   for (var index = 0; index < this.workouts.length; index++) {
  //     for (var y = 0; y < this.workouts[index].info.length; y++) {
  //       //      var date1 = new Date(this.workouts[index].info[y].endDate)
  //       console.log(this.workouts[index].info[y].endDate);
  //       console.log(this.date);
  //       console.log(this.workouts[index].info[y].status);
  //       if ((this.workouts[index].info[y].endDate == val) && (this.workouts[index].info[y].status == true)) {
  //         console.log("success");
  //         console.log(this.date);
  //         this.output.push(this.workouts[index]);
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  // }

  report(tab : any) {
    console.log(tab);
    if(tab == 0) {
      var val = new Date();
      formatDate(val, 'yyyy-MM-dd', 'en');
      console.log(formatDate(val, 'yyyy-MM-dd', 'en'));
      this.today = formatDate(val, 'yyyy-MM-dd', 'en');
      this.dayReport(formatDate(val, 'yyyy-MM-dd', 'en'));
    }else if(tab == 1) {
      this.weekReport();
    }else if(tab == 2) {
      this.monthReport();
    }

  }

  dayReport(val: any) {
    this.check = true;
    this.output = [];
    var count = 0;
    this.totalCalories = 0;
  
    console.log("in get date method");
    console.log(val);
    for (var index = 0; index < this.workouts.length; index++) {
      for (var y = 0; y < this.workouts[index].info.length; y++) {
        if ((this.workouts[index].info[y].startDate == formatDate(val, 'yyyy-MM-dd', 'en')) && (this.workouts[index].info[y].status)) {
          if (this.output.length == 0) {
            this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
            this.output.push(this.workouts[index]);
            console.log("success");
          } else {
            for (var i = 0; i < this.output.length; i++) {
              if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
                this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
                ++count;
              }
             }
             if(count == 0){
              this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
              this.output.push(this.workouts[index]);
              console.log("success");
             }
            }
          } else {
          console.log("not success");
          continue;
        }
        count = 0;
      }
    }
    console.log("length = "+this.output.length);
    if (this.output.length != 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.totalCalories = this.totalCalories.toPrecision(5);
    console.log(this.output);
  }

  timeFormat(time : Date): any {
  //  console.log(time);
    var strTime = ""+time;
    var newTime = parseInt(strTime.substring(11,13))+":"+strTime.substring(14,16)+":"+strTime.substring(17,19);
    return newTime;
  }

  weekReport() {
    this.check = false;
    //console.log(this.workouts.pop[0].info.pop[0].startDate);
   var weekStart = new Date();
   var weekEnd = new Date();
   console.log((weekStart.setDate(weekStart.getDate()-weekStart.getDay())));
   console.log(weekStart.getDate()+"  tt "+weekStart.getDay());
   console.log(weekStart.toLocaleString());
   console.log((weekEnd.setDate(weekStart.getDate()+6)));
   console.log(weekEnd.getDate()+"  tt "+weekEnd.getDay());
   console.log(weekEnd.toLocaleString());
  console.log(formatDate(weekStart, 'yyyy-MM-dd', 'en'));
  this.today = formatDate(weekStart, 'yyyy-MM-dd', 'en');
  // var week = this.datePipe.transform(weekStart, 'yyyy-MM-dd');

 
    this.output = [];
    var count = 0;
    this.totalCalories = 0;
    for (var index = 0; index < this.workouts.length; index++) {
      for (var y = 0; y < this.workouts[index].info.length; y++) {
        if ((this.workouts[index].info[y].startDate >= formatDate(weekStart, 'yyyy-MM-dd', 'en')) && (this.workouts[index].info[y].status)) {
          if (this.output.length == 0) {
            this.output.push(this.workouts[index]);
            this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
          } else {
            for (var i = 0; i < this.output.length; i++) {
              if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
                this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
                ++count;
              }
             }
             if(count == 0){
              this.output.push(this.workouts[index]);
              this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
             }
            }
          } else {
          console.log("not success");
          continue;
        }
        count = 0;
      }
    }
    console.log("length = "+this.output.length);
    if (this.output.length != 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    console.log(this.output);
    this.totalCalories = this.totalCalories.toPrecision(6);
    console.log(this.totalCalories);
  }

  rangeReport(val1 : any , val2 : any) {
    this.showRange = true;
    this.check = false;
    this.output = [];
    var count = 0;
    this.totalCalories = 0;
  
    for (var index = 0; index < this.workouts.length; index++) {
      for (var y = 0; y < this.workouts[index].info.length; y++) {
        if ((this.workouts[index].info[y].startDate >= val1) && (this.workouts[index].info[y].startDate <= val2) && (this.workouts[index].info[y].status)) {
          if (this.output.length == 0) {
            this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
            this.output.push(this.workouts[index]);
          } else {
            for (var i = 0; i < this.output.length; i++) {
              if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
                this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
                ++count;
              }
             }
             if(count == 0){
              this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
              this.output.push(this.workouts[index]);
             }
            }
          } else {
          console.log("not success");
          continue;
        }
        count = 0;
      }
    }
    console.log("length = "+this.output.length);
    if (this.output.length != 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.totalCalories = this.totalCalories.toPrecision(5);
    console.log(this.output);

  }


  monthReport() {
    this.check = false;
    //console.log(this.workouts.pop[0].info.pop[0].startDate);
   var monthStart = new Date();
   var weekEnd = new Date();
   console.log((monthStart.setDate(monthStart.getDate()- (monthStart.getDate() -1))));
   console.log(monthStart.getDate()+"  tt "+monthStart.getDay());
   console.log(monthStart.toLocaleString());
   console.log((weekEnd.setDate(monthStart.getDate()+6)));
   console.log(weekEnd.getDate()+"  tt "+weekEnd.getDay());
   console.log(weekEnd.toLocaleString());
  console.log(formatDate(monthStart, 'yyyy-MM-dd', 'en'));
  this.today = formatDate(monthStart, 'yyyy-MM-dd', 'en');
  // var week = this.datePipe.transform(weekStart, 'yyyy-MM-dd');

 
    this.output = [];
    var count = 0;
    this.totalCalories = 0;
    for (var index = 0; index < this.workouts.length; index++) {
      for (var y = 0; y < this.workouts[index].info.length; y++) {
        if ((this.workouts[index].info[y].startDate >= formatDate(monthStart, 'yyyy-MM-dd', 'en')) && (this.workouts[index].info[y].status)) {
          if (this.output.length == 0) {
            this.output.push(this.workouts[index]);
            this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
          } else {
            for (var i = 0; i < this.output.length; i++) {
              if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
                this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
                ++count;
              }
             }
             if(count == 0){
              this.output.push(this.workouts[index]);
              this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
             }
            }
          } else {
          console.log("not success");
          continue;
        }
        count = 0;
      }
    }
    console.log("length = "+this.output.length);
    if (this.output.length != 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    console.log(this.output);
    this.totalCalories = this.totalCalories.toPrecision(6);
  }

 }

//  weekReport() {
//   this.check = false;
//   //console.log(this.workouts.pop[0].info.pop[0].startDate);
//  var weekStart = new Date();
//  var weekEnd = new Date();
//  console.log((weekStart.setDate(weekStart.getDate()-weekStart.getDay())));
//  console.log(weekStart.getDate()+"  tt "+weekStart.getDay());
//  console.log(weekStart.toLocaleString());
//  console.log((weekEnd.setDate(weekStart.getDate()+6)));
//  console.log(weekEnd.getDate()+"  tt "+weekEnd.getDay());
//  console.log(weekEnd.toLocaleString());
// console.log(formatDate(weekStart, 'yyyy-MM-dd', 'en'));

// // var week = this.datePipe.transform(weekStart, 'yyyy-MM-dd');


//   this.output = [];
//   var count = 0;
//   this.totalCalories = 0;
//   for (var index = 0; index < this.workouts.length; index++) {
//     for (var y = 0; y < this.workouts[index].info.length; y++) {
//       if ((this.workouts[index].info[y].startDate >= formatDate(weekStart, 'yyyy-MM-dd', 'en')) && (this.workouts[index].info[y].status)) {
//         if (this.output.length == 0) {
//           this.output.push(this.workouts[index]);
//           this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//         } else {
//           for (var i = 0; i < this.output.length; i++) {
//             if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
//               this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//               ++count;
//             }
//            }
//            if(count == 0){
//             this.output.push(this.workouts[index]);
//             this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//            }
//           }
//         } else {
//         console.log("not success");
//         continue;
//       }
//       count = 0;
//     }
//   }
//   console.log("length = "+this.output.length);
//   if (this.output.length != 0) {
//     this.show = true;
//   } else {
//     this.show = false;
//   }
//   console.log(this.output);
//   this.totalCalories = this.totalCalories.toPrecision(6);
//   console.log(this.totalCalories);
// }

// rangeReport(val1 : any , val2 : any) {
//   this.showRange = true;
//   this.check = false;
//   this.output = [];
//   var count = 0;
//   this.totalCalories = 0;

//   for (var index = 0; index < this.workouts.length; index++) {
//     for (var y = 0; y < this.workouts[index].info.length; y++) {
//       if ((this.workouts[index].info[y].startDate >= val1) && (this.workouts[index].info[y].startDate <= val2) && (this.workouts[index].info[y].status)) {
//         if (this.output.length == 0) {
//           this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//           this.output.push(this.workouts[index]);
//         } else {
//           for (var i = 0; i < this.output.length; i++) {
//             if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
//               this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//               ++count;
//             }
//            }
//            if(count == 0){
//             this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//             this.output.push(this.workouts[index]);
//            }
//           }
//         } else {
//         console.log("not success");
//         continue;
//       }
//       count = 0;
//     }
//   }
//   console.log("length = "+this.output.length);
//   if (this.output.length != 0) {
//     this.show = true;
//   } else {
//     this.show = false;
//   }
//   this.totalCalories = this.totalCalories.toPrecision(5);
//   console.log(this.output);

// }


// monthReport() {
//   this.check = false;
//   //console.log(this.workouts.pop[0].info.pop[0].startDate);
//  var monthStart = new Date();
//  var weekEnd = new Date();
//  console.log((monthStart.setDate(monthStart.getDate()- (monthStart.getDate() -1))));
//  console.log(monthStart.getDate()+"  tt "+monthStart.getDay());
//  console.log(monthStart.toLocaleString());
//  console.log((weekEnd.setDate(monthStart.getDate()+6)));
//  console.log(weekEnd.getDate()+"  tt "+weekEnd.getDay());
//  console.log(weekEnd.toLocaleString());
// console.log(formatDate(monthStart, 'yyyy-MM-dd', 'en'));

// // var week = this.datePipe.transform(weekStart, 'yyyy-MM-dd');


//   this.output = [];
//   var count = 0;
//   this.totalCalories = 0;
//   for (var index = 0; index < this.workouts.length; index++) {
//     for (var y = 0; y < this.workouts[index].info.length; y++) {
//       if ((this.workouts[index].info[y].startDate >= formatDate(monthStart, 'yyyy-MM-dd', 'en')) && (this.workouts[index].info[y].status)) {
//         if (this.output.length == 0) {
//           this.output.push(this.workouts[index]);
//           this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//         } else {
//           for (var i = 0; i < this.output.length; i++) {
//             if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
//               this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//               ++count;
//             }
//            }
//            if(count == 0){
//             this.output.push(this.workouts[index]);
//             this.totalCalories += this.workouts[index].info[y].caloriesBurntPerDay;
//            }
//           }
//         } else {
//         console.log("not success");
//         continue;
//       }
//       count = 0;
//     }
//   }
//   console.log("length = "+this.output.length);
//   if (this.output.length != 0) {
//     this.show = true;
//   } else {
//     this.show = false;
//   }
//   console.log(this.output);
//   this.totalCalories = this.totalCalories.toPrecision(6);
// }




  // working 

  // getDate(val :any) {
  //   this.output =[];
  //   console.log("in get date method");
  //   console.log(val);
  //   for (var index = 0; index < this.workouts.length; index++) {
  //     for (var y = 0; y < this.workouts[index].info.length; y++) {
  //       if ((this.workouts[index].info[y].startDate == val)) {
  //         console.log("success");
  //        this.output.push(this.workouts[index]);
  //       } else {
  //         console.log("not success");
  //         continue;
  //       }
  //     }
  //   }
  // }

  // getDate(val :any) {
  //   //var date = new Date(val);
  //   console.log(val+"hjhj");
  //   this.show = true;
  //   for (var index = 0; index < this.workouts.length; index++) {
  //     for (var y = 0; y < this.workouts[index].info.length; y++) {
  //       //      var date1 = new Date(this.workouts[index].info[y].endDate)
  //       console.log(this.workouts[index].info[y].endDate);
  //       console.log(this.date);
  //       console.log(this.workouts[index].info[y].status);
  //       if ((this.workouts[index].info[y].endDate == val) && (this.workouts[index].info[y].status == true)) {
  //         console.log("success");
  //         console.log(this.date);
  //         this.output.push(this.workouts[index]);
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  // }


  // getDate(val: any) {
  //   this.output = [];
  //   var count = 0;
  //   console.log("in get date method");
  //   console.log(val);
  //   for (var index = 0; index < this.workouts.length; index++) {
  //     for (var y = 0; y < this.workouts[index].info.length; y++) {
  //       if ((this.workouts[index].info[y].startDate == val) && (this.workouts[index].info[y].status)) {
  //         if (this.output.length == 0) {
  //           this.output.push(this.workouts[index]);
  //         } else {
  //           for (var i = 0; i < this.output.length; i++) {
  //             if (this.output[i].workoutTitle == this.workouts[index].workoutTitle) {
  //               ++count;
  //             }
  //            }
  //            if(count == 0){
  //             this.output.push(this.workouts[index]);
  //            }
  //           }
  //         } else {
  //         console.log("not success");
  //         continue;
  //       }
  //       count = 0;
  //     }
  //   }
  //   console.log("length = "+this.output.length);
  //   if (this.output.length != 0) {
  //     this.show = true;
  //   } else {
  //     this.show = false;
  //   }
  //   console.log(this.output);
  // }