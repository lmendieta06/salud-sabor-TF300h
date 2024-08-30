import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuRestaurantComponent } from './pages/menu-restaurant/menu-restaurant.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';



export const routes: Routes = [
    {path:"", component: HomeComponent, title: "Salud & Sabor"},
    {path:"restaurantes", component: RestaurantsComponent, title: "Restaurantes"},
    {path:"registro", component: RegisterComponent, title: "Registro"},
    {path:"login", component:LoginComponent, title: "Log in"},
    {path:"recover", component:RecoverPasswordComponent, title: "Recuperar contraseña"},
    {path: 'cart', component: CartComponent },  // Ruta para el carrito
    { path: 'profile', component: ProfileComponent,title:"Mi Perfil" },
    {path:"contactanos", component:ContactUsComponent, title:"Contactanos"},
    {path:"administrador", component:AdminComponent, title:"Administrador"},
 
    {path:"menuRest", component:MenuRestaurantComponent, title: "Menú"},
    {path:"singIn", component:SignInComponent, title:"Crear cuenta"},
    {path:"sobreNosotros", component:AboutUsComponent, title:"Sobre Nosotros"},
    {path:"**", component:NoEncontradoComponent, title:"Salud & Sabor - ERROR"}
    
];
