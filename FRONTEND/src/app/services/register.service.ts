import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//hola
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private URL_REGISTER = 'http://localhost:2000/registro';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.URL_REGISTER, userData);
  }
}