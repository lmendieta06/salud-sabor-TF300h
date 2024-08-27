import { Injectable, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { Credentials } from '../../interfaces/credentials';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  return this.httpClient.post(this.API_URL, credentials).pipe(
    tap((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.authStatusSubject.next(true); // Actualiza el estado de autenticación
      }
    })
  );
}
  // Acceso al token guardado localmente 
  getToken(): string | null {
    // Verifica si window está definido
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
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
        window.location.href = '/administrador';
      });
    } else {
      this.ngZone.run(() => {
        window.location.href = '/';
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
        
        
        
        
        // Limpia la UI
        this.clearUserInfo();
  
        // Redirecciona a la página de inicio
        this.router.navigate(['/']);
      }
    });
  }
  
  // Método para limpiar la información del usuario
  private clearUserInfo() {
    // Este método puede emitir un evento o simplemente limpiar variables en otros servicios o componentes
    // Por ejemplo, emitir un evento de 'logout' que pueda ser capturado por otros componentes
  }

}