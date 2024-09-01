import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminResponse } from '../../interfaces/adminRes';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // dependencias
  private httpClient = inject(HttpClient);

  private URL_ADMIN = "http://localhost:2000/admin"

  // Crear un nuevo administrador
  createAdmin(adminUser: {nombre: string, correoElectronico: string, contrasena: string}) {
    return this.httpClient.post(`${this.URL_ADMIN}`, adminUser);
  }

  // Obtener todos los administradores
  getAdmins() : Observable<AdminResponse> {
    return this.httpClient.get<AdminResponse>(this.URL_ADMIN);
  }

  // Actualizar un administrador por ID
  updateAdmin(adminId: string, updatedData: any) {
    return this.httpClient.put(`${this.URL_ADMIN}/${adminId}`, updatedData);
  }

  deleteAdmin(id:string){
    return this.httpClient.delete(`${this.URL_ADMIN}/${id}`);
  }
}

