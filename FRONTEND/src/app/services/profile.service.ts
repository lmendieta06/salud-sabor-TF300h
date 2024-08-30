import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:2000/users/profile';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token'); // Obtén el token JWT del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados de la solicitud
    });
    return this.http.get<User>(this.apiUrl, { headers });
  }
}
