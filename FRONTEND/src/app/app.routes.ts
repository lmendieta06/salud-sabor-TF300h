import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
// import { ClientComponent } from './pages/client/client.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuRestaurantComponent } from './pages/menu-restaurant/menu-restaurant.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { PanelAdministradoresComponent } from './components/panel-administradores/panel-administradores.component';
import { PanelRestaurantesComponent } from './components/panel-restaurantes/panel-restaurantes.component';
import { PanelUusariosComponent } from './components/panel-uusarios/panel-uusarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuRestauranteComponent } from './components/menu-restaurante/menu-restaurante.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';

export const routes: Routes = [
    {path:"", component: HomeComponent, title: "Salud & Sabor"},
    {path:"restaurantes", component: RestaurantsComponent, title: "Restaurantes"},
    {path:"registro", component: RegisterComponent, title: "Registro"},
    {path:"login", component:LoginComponent, title: "Log in"},
    {path:"recover", component:RecoverPasswordComponent, title: "Recuperar contraseña"},
    {path: 'cart', component: CartComponent }, 
    {path:"contactanos", component:ContactUsComponent, title:"Contactanos"},
    {path:"administrador", component:AdminComponent, title:"Administrador", children:[
        {path:"panel-restaurantes", component:PanelRestaurantesComponent, title:"Restaurantes"},
        {path:"panel-restaurantes/formsAgregarRestaurante", component:AddRestaurantComponent, title:"Formulario - Crear Restaurante"},
        {path:"panel-restaurantes/:restauranteId", component:MenuRestauranteComponent, title:"Panel Menú"},
        {path:"administradores", component:PanelAdministradoresComponent, title:"Administradores"},
        {path:"usuarios", component:PanelUusariosComponent, title:"Usuarios"},
        {path:"dashboard", component:DashboardComponent, title:"Dashboard"}
    ]},
    // {path:"cliente", component:ClientComponent, title:"Salud & Sabor"},
    {path:"menuRest", component:MenuRestaurantComponent, title: "Menú"},
    {path:"singIn", component:SignInComponent, title:"Crear cuenta"},
    {path:"sobreNosotros", component:AboutUsComponent, title:"Sobre Nosotros"},
    {path:"**", component:NoEncontradoComponent, title:"Salud & Sabor - ERROR"}
    
];
