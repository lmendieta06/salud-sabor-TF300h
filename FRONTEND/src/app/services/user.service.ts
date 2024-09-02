import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { UserResponse } from '../../interfaces/userResponse';
import { Observable } from 'rxjs';
import { AdminResponse } from '../../interfaces/adminRes';




@Injectable({
  providedIn: 'root'
})
export class UserService {

 //dependencias
private httpClient = inject(HttpClient);
private URL_USERS = "http://localhost:2000/users"


// peticiones get, getById, post y put
  getUsers() : Observable<UserResponse>{
    return this.httpClient.get<UserResponse>(this.URL_USERS);
  }
 
  // Obtener un usuario por ID
  getUserById(id: string) {
    return this.httpClient.get(`${this.URL_USERS}/${id}`);
  }
  // CREAR USUARIO
  postUser(userData: FormData): Observable<any> {
    return this.httpClient.post(this.URL_USERS,userData);
  }

  // ACTUALIZAR USUARIO
  putUser(userUpdate:User, id:string){
    return this.httpClient.put(`${this.URL_USERS}/${id}`, userUpdate);
  }
  getUserProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.URL_USERS}/profile`);
  }

  //recuperacion de contraseña 
  recoverPassword(email: string): Observable<any> {
    return this.httpClient.post(`${this.URL_USERS}/recover-password`, { email });
  }
}


