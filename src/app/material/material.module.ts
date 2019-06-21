import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


const  materialComponents = [MatButtonModule, MatTabsModule];
@NgModule({
  imports: [materialComponents],
  exports : [materialComponents]
})
export class MaterialModule { }
