import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl_DISH = 'http://localhost:2000/dishes'; 

  constructor(private httpclient: HttpClient) { }

  getDishes(): Observable<{ dishes: Dish[] }> {
    return this.httpclient.get<{ dishes: Dish[] }>(this.apiUrl_DISH);
  }

  
}