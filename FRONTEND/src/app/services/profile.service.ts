import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../../interfaces/tokenPayload';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://159.223.114.19:2000/users/profile';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token'); // Obtén el token JWT del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados de la solicitud
    });
    return this.http.get<User>(this.apiUrl, { headers });
  }



  updateUserProfile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>('http://159.223.114.19:2000/users/' + this.getUserIdFromToken(), formData, { headers });
  }
  
  // Método para obtener el ID del usuario del token (puedes ajustar esto según cómo manejes el token)
  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: TokenPayload = jwtDecode(token);
      return decoded.id;
    }
    return '';
  }


}
