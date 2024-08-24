import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {jwtDecode} from "jwt-decode"
import { Credentials } from '../../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private API_URL = 'http://localhost:2000/login';

  // Método para iniciar sesión
  login(credentials: Credentials) {
    return this.httpClient.post(this.API_URL, credentials);
  }

  // Acceso al token guardado localmente 
  getToken() {
    return localStorage.getItem('token');
  }

  // Validación  administrador
  isAdmin() {
    const token = this.getToken();
    if (token) {
      try {
        // Decodificación del token con jwtDecode
        const decoded: any = jwtDecode(token);
        
        return decoded.isAdmin || false;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    } else {
      console.error('No se encontró token');
      return false;
    }
  }

  // Redireccionar a ruta pública si es usuario y a ruta privada si es admin
  redirect() {
    if (this.isAdmin()) {
      window.location.href = '/administrador';
    } else {
      window.location.href = '/';
    }
  }
  
  // Nos guarda si inició sesión o no
  isLogged() {
    // Verdadero o falso si hay o no token
    return this.getToken() ? true : false;
  }

  // Nos permite cerrar sesión
  logout() {
    // Muestra un mensaje usando SweetAlert2
    Swal.fire({
      title: '¡Hasta la próxima!',
      text: 'Cierre de sesión exitoso',
      icon: 'info',
      timer: 2000, //en 2 seg se cierra el alert
      timerProgressBar: true, // Barra de progreso
      didClose: () => { //continua con el resto de logica
        // Elimina el token del almacenamiento temporal
        localStorage.removeItem('token');
        // Redirecciona a la página de inicio
        this.router.navigate(['/']);
      }
    });
  }
}