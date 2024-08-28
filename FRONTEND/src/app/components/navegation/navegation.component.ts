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
export class NavegationComponent implements OnInit, OnDestroy, AfterViewInit {
  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible: boolean = false;
  itemsInCart: any[] = [];

  isLoggedIn: boolean = false;
  userName: string = '';
  imagenPerfil: string = 'http://localhost:2000/uploads/default-user.png';

  private authSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;

  constructor(
    public cartService: CartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado'); // Verifica si ngOnInit se ejecuta
  
    // Suscribirse a los cambios en el estado de autenticación
    this.authSubscription = this.loginService.authStatus$.subscribe(
      (isLoggedIn) => {
        console.log('Estado de autenticación recibido en la suscripción:', isLoggedIn);

        this.isLoggedIn = isLoggedIn;
        this.updateUserInfo();

        console.log('Estado inicial de autenticación:', this.isLoggedIn);
      }
    );

    // Inicializar la información del usuario
    this.isLoggedIn = this.loginService.isLogged();
    console.log('Estado de autenticación al cargar el componente:', this.isLoggedIn);
   
    this.updateUserInfo();

    // Suscribirse a los cambios en el carrito de compras
    this.cartSubscription = this.cartService.itemsInCart$.subscribe(
      (items) => {
        this.itemsInCart = items;
      }
    );

    // Actualiza la información del usuario durante la inicialización
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit ejecutado');

    this.authSubscription = this.loginService.authStatus$.subscribe(
      (isLoggedIn) => {
        console.log('Estado de autenticación recibido en ngAfterViewInit:', isLoggedIn);
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
      console.log('Token obtenido:', token); // clg para verificar el token obtenido

      if (token) {
        
        try {
          const decodedToken: any = jwtDecode(token);
          console.log('Token decodificado:', decodedToken); // clg para ver el contenido del token

          // Asigna el nombre del usuario segun la informacion decodificada en nuestro token
          this.userName = decodedToken.name || 'Usuario';
          console.log('Nombre de usuario:', this.userName); // clg para verificar el nombre de usuario
          if (decodedToken.imagenPerfil) {
            this.imagenPerfil = `http://localhost:2000/uploads/${decodedToken.imagenPerfil}`;
            console.log('URL de la imagen de perfil:', this.imagenPerfil); // clg para verificar la URL de la imagen de perfil

          } else {
            this.imagenPerfil = 'http://localhost:2000/uploads/default-user.png';
            console.log('Se usa la imagen de perfil predeterminada'); // clg cuando se usa la imagen predeterminada
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
    this.imagenPerfil = 'http://localhost:2000/uploads/default-user.png';
  }

  logout(): void {
    this.loginService.logout();
  }

  // Métodos para manejar el menú desplegable
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.dropdown') &&
      !target.closest('.userIcon') &&
      !target.closest('.userImageContainer')
    ) {
      this.hideDropdown();
    }
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  hideDropdown(): void {
    this.isDropdownVisible = false;
  }
}