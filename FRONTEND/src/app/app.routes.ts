import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ClientComponent } from './pages/client/client.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuRestaurantComponent } from './pages/menu-restaurant/menu-restaurant.component';
import { RecipesTipsComponent } from './pages/recipes-tips/recipes-tips.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';



export const routes: Routes = [
    {path:"", component: HomeComponent, title: "Salud & Sabor"},
    {path:"restaurantes", component: RestaurantsComponent, title: "Restaurantes"},
    {path:"registro", component: RegisterComponent, title: "Registro"},
    {path:"login", component:LoginComponent, title: "Log in"},
    {path:"contactanos", component:ContactUsComponent, title:"Contactanos"},
    {path:"administrador", component:AdminComponent, title:"Administrador"},
    {path:"cliente", component:ClientComponent, title:"Salud & Sabor"},
    {path:"menu", component:MenuRestaurantComponent, title: "Menú"},
    {path:"tips", component:RecipesTipsComponent, title:"Recetas"},
    {path:"singIn", component:SignInComponent, title:"Crear cuenta"},
    {path:"sobreNosotros", component:AboutUsComponent, title:"Sobre Nosotros"},
    {path:"**", component:NoEncontradoComponent, title:"Salud & Sabor - ERROR"}
    
];
