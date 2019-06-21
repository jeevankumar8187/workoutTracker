import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TrackComponent } from './track/track.component';
import {HttpClientModule} from '@angular/common/http'
import { WorkoutService } from './workout.service';
import { CategoryService } from './category.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditWorkoutComponent } from './view-all/edit-workout/edit-workout.component';
import { StartComponent } from './view-all/start/start.component';
import { EndComponent } from './view-all/end/end.component';
import { NgMarqueeModule } from 'ng-marquee';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewAllComponent,
    CreateWorkoutComponent,
    CreateCategoryComponent,
    TrackComponent,
    EditWorkoutComponent,
    StartComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [WorkoutService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
