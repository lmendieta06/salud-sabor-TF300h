import { PLATFORM_ID, Inject } from '@angular/core';
import { AfterViewInit, Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartComponent } from './components/cart/cart.component';
import AOS from 'aos';

import { StorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  error: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService, 
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserProfile();
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        delay: 100,
      });

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });

      const token = this.storageService.load('token');
      if (token) {
        console.log('Token encontrado:', token);
      } else {
        console.log('No hay token disponible.');
      }
    
    }
  }

  loadUserProfile(): void {
    const userProfile = this.storageService.load('userProfile'); // Cargar perfil del usuario desde localStorage
    if (userProfile) {
      try {
        const userData = JSON.parse(userProfile);
        // Aquí puedes manejar la imagen de perfil u otros datos del usuario
        console.log('Imagen de perfil:', userData.imagenPerfil);
      } catch (e) {
        console.error('Error al parsear userProfile:', e);
      }
    } else {
      console.log('No se encontró perfil de usuario en localStorage.');
    }
  }
}