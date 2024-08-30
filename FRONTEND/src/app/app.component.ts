import { PLATFORM_ID, Inject } from '@angular/core';
import { AfterViewInit, Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartComponent } from './components/cart/cart.component';
import AOS from 'aos';
import { ProfileService } from './services/profile.service';
import { StorageService } from './services/local-storage.service'; // Importa el servicio de almacenamiento

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
  
    private storageService: StorageService, // Usa el servicio de almacenamiento
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

      const token = this.storageService.load('token'); // Usa el servicio para acceder a localStorage
      if (token) {
        console.log('Token encontrado:', token);
      } else {
        console.log('No hay token disponible.');
      }
    } else {
      this.error = 'localStorage no está disponible en el servidor.';
      console.error(this.error);
    }
  }

  loadUserProfile(): void {
    // Implementa la lógica para cargar el perfil del usuario si es necesario
  }
}