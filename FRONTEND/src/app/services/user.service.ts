import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs'; 





@Injectable({
  providedIn: 'root'
})
export class UserService {

 //dependencias
private httpClient = inject(HttpClient);
private URL_USERS = "http://localhost:2000/users"


// peticiones get, getById, post y put
getUsers(options?: any): Observable<any> {
  return this.httpClient.get<any>(this.URL_USERS, options);
}
 
  // Obtener un usuario por ID
  getUserById(id: string) {
    return this.httpClient.get(`${this.URL_USERS}/${id}`);
  }
  // CREAR USUARIO
  postUser(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.URL_USERS, formData);
  }


  // Actualizar usuario
  putUser(userUpdate: User, id: string): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_USERS}/${id}`, userUpdate);
  }


}

