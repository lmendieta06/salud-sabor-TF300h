import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  loginService = inject(LoginService);

  private API_URL_DISH = 'http://localhost:2000/dishes'; 

  private getAuthHeaders(): HttpHeaders {
    const token = this.loginService.getToken(); // Asegúrate de tener un método en LoginService que obtenga el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  constructor(private httpclient: HttpClient) { }

  getDishes(): Observable<{ dishes: Dish[] }> {
    return this.httpclient.get<{ dishes: Dish[] }>(this.API_URL_DISH);
  }
    // Obtener platos por restaurante
    getDishesByRestaurant(restauranteId: string): Observable<Dish[]> {
      return this.httpclient.get<Dish[]>(`${this.API_URL_DISH}/restaurant/${restauranteId}`);
    }
  postDish(dish:{nombrePlato:string, categoriaMenu:string, descripcionPlato:string, imagenPlato:string, precioPlato:string}){
    return this.httpclient.post(`${this.API_URL_DISH}`, dish, { headers: this.getAuthHeaders() });
  }

  updateDish(dishId:string, updateData : any){
    return this.httpclient.put(`${this.API_URL_DISH}/${dishId}`, updateData, { headers: this.getAuthHeaders() });
  }

  deleteDish(dishId:string){
    return this.httpclient.delete(`${this.API_URL_DISH}/${dishId}`, { headers: this.getAuthHeaders() });
  }

  
}