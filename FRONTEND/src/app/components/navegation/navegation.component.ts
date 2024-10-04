import { Component, OnInit,AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de importar jwt-decode correctamente

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink, CommonModule, CartComponent],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit, OnDestroy {
  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible: boolean = false;
  itemsInCart: any[] = [];

  isLoggedIn: boolean = false;
  userName: string = '';
  imagenPerfil: string = 'http://159.223.114.19:2000/uploads/default-user.png';

  private authSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;

  constructor(
    public cartService: CartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
  
    // Suscribirse a los cambios en el estado de autenticación
    this.authSubscription = this.loginService.authStatus$.subscribe(
      (isLoggedIn) => {

        this.isLoggedIn = isLoggedIn;
        this.updateUserInfo();

      }
    );

    // Inicializar la información del usuario
    this.isLoggedIn = this.loginService.isLogged();
   
    this.updateUserInfo();

    // Suscribirse a los cambios en el carrito de compras
    this.cartSubscription = this.cartService.itemsInCart$.subscribe(
      (items) => {
        this.itemsInCart = items;
      }
    );

    // Actualiza la información del usuario durante la inicialización
  


    this.authSubscription = this.loginService.authStatus$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.updateUserInfo();
      }
    );
  }

  ngOnDestroy(): void {
    //quitar subscribe para evitar fugas de memoria :DDD
    this.authSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  updateUserInfo(): void {
    if (this.isLoggedIn) {
      const token = this.loginService.getToken();

      if (token) {
        
        try {
          const decodedToken: any = jwtDecode(token);

          // Asigna el nombre del usuario segun la informacion decodificada en nuestro token
          this.userName = decodedToken.name || 'Usuario';
          if (decodedToken.imagenPerfil) {
            this.imagenPerfil=decodedToken.imagenPerfil;
            // this.imagenPerfil = `http://159.223.114.19:2000/uploads/${decodedToken.imagenPerfil}`;

          } else {
            this.imagenPerfil = 'http://159.223.114.19:2000/uploads/default-user.png';
          }
        } catch (error) {
          
          console.error('Error al decodificar el token:', error);
          this.resetUserInfo();
        }
      } else {
        this.resetUserInfo();
      }
    } else {
      this.resetUserInfo();
    }
  }

  resetUserInfo(): void {
    this.userName = '';
    this.imagenPerfil = 'http://159.223.114.19:2000/uploads/default-user.png';
  }

  logout(): void {
    this.loginService.logout();
  }

  // Métodos para manejar el menú desplegable
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = true;
    console.log('Dropdown visible:', this.isDropdownVisible);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    this.hideTimeout = setTimeout(() => {
      this.isDropdownVisible = false;
      console.log('Dropdown visible:', this.isDropdownVisible);
    }, 800);
  }

  hideDropdown() {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = false;
  }
}
