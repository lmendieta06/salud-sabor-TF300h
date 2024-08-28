import { Injectable, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { Credentials } from '../../interfaces/credentials';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private API_URL = 'http://localhost:2000/login'; 
  private ngZone = inject(NgZone);

  // BehaviorSubject para manejar el estado de autenticación
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLogged());
  authStatus$ = this.authStatusSubject.asObservable();

  // Método para iniciar sesión
  login(credentials: Credentials) {
    return this.httpClient.post<{ tokenGenerado?: string }>(this.API_URL, credentials).pipe(
      tap(response => {
        if (response.tokenGenerado) {
          this.setToken(response.tokenGenerado);
          this.setAuthStatus(true);
          this.redirect(); // Redirecciona después de iniciar sesión
        } else {
          console.error('Token no encontrado en la respuesta:', response);
          Swal.fire({
            title: 'Error',
            text: 'No se recibió un token válido.',
            icon: 'error'
          });
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al intentar iniciar sesión. Inténtalo de nuevo más tarde.',
          icon: 'error'
        });
        return throwError(error);
      })
    );
  }
  // Acceso al token guardado localmente 
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
    
      return token;
    }
    return null;
  }

  // Validación administrador
  isAdmin(): boolean {
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
      this.ngZone.run(() => {
        this.router.navigate(['/administrador']);
      });
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
    }
  }

  // Nos guarda si inició sesión o no
  isLogged(): boolean {
    // Verdadero o falso si hay o no token
    return this.getToken() ? true : false;
  }

  // Nos permite cerrar sesión
  logout() {
    Swal.fire({
      title: '¡Hasta la próxima!',
      text: 'Cierre de sesión exitoso',
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
      didClose: () => {
        // Elimina el token del almacenamiento local
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        this.authStatusSubject.next(false); // Actualiza el estado de autenticación
        this.clearUserInfo();
        this.router.navigate(['/']);
      }
    });
  }

  // Método para limpiar la información del usuario
  private clearUserInfo() {
    // Este método puede emitir un evento o simplemente limpiar variables en otros servicios o componentes
    // Por ejemplo, emitir un evento de 'logout' que pueda ser capturado por otros componentes
  }

  // Establece el token en localStorage
  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  
  private setAuthStatus(status: boolean) {
    this.authStatusSubject.next(status);
  }}