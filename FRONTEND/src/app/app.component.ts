
import { PLATFORM_ID, Inject } from '@angular/core';
import { AfterViewInit, Component,} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartComponent } from './components/cart/cart.component';
import AOS from "aos";
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private httpClient: HttpClient 

  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializa AOS
      AOS.init({
        duration: 800, // Duración en milisegundos
        easing: 'ease-in-out', // Efecto de aceleración
        delay: 100, // Retraso en milisegundos
        
      });

      // Reinicia el scroll al cambiar de página
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    
    
    }
  }
}