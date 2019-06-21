import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from './view-all/Workout';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
  })
};
@Injectable({
  providedIn: 'root'
})

export class WorkoutService {

  constructor(private http:HttpClient) { }
  api="http://localhost:8095/api/v1/workout";

  getAllWorkouts():Observable<any>{
    return this.http.get(this.api+"/all");
  }

  addWorkout(workout : any):Observable<any>{
    var url ="http://localhost:8095/api/v1/workout/add";
    return  this.http.post(url,workout);
  }
  updateWorkout(workout : Workout):Observable<any>{
    return  this.http.put("http://localhost:8095/api/v1/workout/update",workout);
    
  }

  getWorkoutByTitle(title : any):Observable<any>{
    return this.http.get(this.api+"/find/"+title);
  }

  getWorkoutById(id : String):Observable<any>{
  var url = "http://localhost:8095/api/v1/workout/id/";
    return this.http.get(url+id);
  }

  deleteWorkout(id : any):Observable<any>{
    return this.http.delete(this.api+"/delete/id/"+id);
  }

  startWorkout(id : any) :Observable<any>{
    return this.http.get(this.api+"/start/"+id);
  }

  endWorkout(id : any) :Observable<any>{
    return this.http.get(this.api+"/end/"+id);
  }

}
