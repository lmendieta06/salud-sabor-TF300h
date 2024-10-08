import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminResponse } from '../../interfaces/adminRes';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // dependencias
  private httpClient = inject(HttpClient);
  private loginService = inject(LoginService); // Asegúrate de importar LoginService

  private URL_ADMIN = "http://159.223.114.19:2000/admin"

  private getAuthHeaders(): HttpHeaders {
    const token = this.loginService.getToken(); // Asegúrate de tener un método en LoginService que obtenga el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  // Crear un nuevo administrador
  createAdmin(adminUser: {nombre: string, correoElectronico: string, contrasena: string}) {

    return this.httpClient.post(`${this.URL_ADMIN}`, adminUser,{ headers: this.getAuthHeaders() });
 
  }

  // Obtener todos los administradores
  getAdmins() : Observable<AdminResponse> {

    return this.httpClient.get<AdminResponse>(this.URL_ADMIN,{ headers: this.getAuthHeaders() });
  }

  // Actualizar un administrador por ID
  updateAdmin(adminId: string, updatedData: any) {
   
    return this.httpClient.put(`${this.URL_ADMIN}/${adminId}`, updatedData,{ headers: this.getAuthHeaders() });
  }

  deleteAdmin(id:string){
  
    return this.httpClient.delete(`${this.URL_ADMIN}/${id}`,);
  }
}

