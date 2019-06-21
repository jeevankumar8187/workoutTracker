import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllComponent } from './view-all/view-all.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TrackComponent } from './track/track.component';
import { EditWorkoutComponent } from './view-all/edit-workout/edit-workout.component';
import { StartComponent } from './view-all/start/start.component';
import { EndComponent } from './view-all/end/end.component';

const routes: Routes =
 [{path : 'viewall', component: ViewAllComponent},
 {path : 'create/workout', component: CreateWorkoutComponent}, 
 {path : 'create/category', component: CreateCategoryComponent}, 
 {path : 'track', component: TrackComponent} ,
 {path : 'viewall/edit/workout/:id',component:EditWorkoutComponent},
 {path : 'viewall/start/workout/:id',component:StartComponent},
 {path : 'viewall/end/workout/:id',component:EndComponent}          
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
