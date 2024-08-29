import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  httpClient = inject(HttpClient);

  API_URL_GET_ID = "http://localhost:2000/menu/:_id";
  API_URL_UPDATE_ID = "http://localhost:2000/menu/:_id";

  getMenuById(id:string){
    return this.httpClient.get(`${this.API_URL_GET_ID.replace(":_id",id)}`);
  }

  updateMenuById(id: string, updateData: any) {
    return this.httpClient.put(this.API_URL_UPDATE_ID.replace(":_id", id), updateData);
  }
}
