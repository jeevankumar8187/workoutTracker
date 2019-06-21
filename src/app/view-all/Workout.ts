import { Category } from '../create-category/Category';
import { Info } from './info';

export class Workout{
	
	 workoutTitle:String;
	
	 workoutNote:String;
	
	caloriesBurntPerMin:number;
	
	categories : Category[];
	
	 info : Info[];

	 toString():String {
		return "Workout [workoutTitle=" + this.workoutTitle + ", workoutNote=" + this.workoutNote
				+ ", caloriesBurntPerMin=" + this.caloriesBurntPerMin + ", categories=" + this.categories + ", info=" + this.info
				+ "]";
	 }

}