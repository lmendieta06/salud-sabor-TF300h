import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private API_URL_DISH = 'http://localhost:2000/dishes'; 

  constructor(private httpclient: HttpClient) { }

  getDishes(): Observable<{ dishes: Dish[] }> {
    return this.httpclient.get<{ dishes: Dish[] }>(this.API_URL_DISH);
  }

  postDish(dish:{nombrePlato:string, categoriaMenu:string, descripcionPlato:string, imagenPlato:string, precioPlato:string}){
    return this.httpclient.post(`${this.API_URL_DISH}`, dish);
  }

  updateDish(dishId:string, updateData : any){
    return this.httpclient.put(`${this.API_URL_DISH}/${dishId}`, updateData);
  }

  deleteDish(dishId:string){
    return this.httpclient.delete(`${this.API_URL_DISH}/${dishId}`);
  }

  
}