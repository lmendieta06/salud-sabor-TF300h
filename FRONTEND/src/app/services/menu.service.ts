import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../pages/login/login.component';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  httpClient = inject(HttpClient);
  loginService = inject(LoginService);

  API_URL_GET_ID = "http://localhost:2000/menu/:_id";
  API_URL_UPDATE_ID = "http://localhost:2000/menu/:_id";
  API_URL_POST = "http://localhost:2000/menu";

  private getAuthHeaders(): HttpHeaders {
    const token = this.loginService.getToken(); // Asegúrate de tener un método en LoginService que obtenga el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getMenuById(id:string){
    return this.httpClient.get(`${this.API_URL_GET_ID.replace(":_id",id)}`);
  }

  postMenu(Menu : {title:string, imgLogo : string, category:string, dishes : any[]}){

    return this.httpClient.post(`${this.API_URL_POST}`, Menu, { headers: this.getAuthHeaders() });
  }

  updateMenuById(id: string, updateData: any) {
    return this.httpClient.put(this.API_URL_UPDATE_ID.replace(":_id", id), updateData, { headers: this.getAuthHeaders() });
  }
}
