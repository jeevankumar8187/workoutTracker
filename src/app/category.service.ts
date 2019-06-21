import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from './create-category/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  

  getAllCategories():Observable<any>{
    return this.http.get("http://localhost:8095/api/v1/category/all");

  }

  addCategory(category : any):Observable<any>{
    const options = {headers:{'Content-Type':'application/json'}};
     return this.http.post("http://localhost:8095/api/v1/category/add",category,options);
  }

  deleteCategory(id:any){
    //const options = {headers:{'Content-Type':'application/json'}};
    return this.http.delete<any>("http://localhost:8095/api/v1/category/delete/"+id);
  }

  updateCategory(category : any):Observable<any>{
    const options = {headers:{'Content-Type':'application/json'}};
     return this.http.put("http://localhost:8095/api/v1/category/update",category,options);
  }

  api="http://localhost:8095/api/v1/category/find/id/";

  getCategoryById(id:any):Observable<any>{
    return this.http.get(this.api+id);
  }
  getCategoryByName(name:any):Observable<any>{
   var url = "http://localhost:8095/api/v1/category/find/"
    return this.http.get(url+name);
  }


  
}
