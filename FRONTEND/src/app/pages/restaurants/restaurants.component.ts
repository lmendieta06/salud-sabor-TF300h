import { Component, inject } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { RestaurantService } from '../../services/restaurant.service.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    NavegationComponent, 
    RouterLink, 
    FooterComponent, 
    ChatBotComponent, 
    CommonModule, 
    FormsModule
    
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})

export class RestaurantsComponent {

  // Inyección de servicios
  restaurantsService = inject(RestaurantService);
  router = inject(Router);


  allRestaurants: any[] = [];
  ciudad : string = "";
  categoria : string = "";

  // Método para obtener restaurantes
  getRestaurants() {
    this.restaurantsService.getRestaurants().subscribe((res: any) => {
      if (res) {
        this.allRestaurants = res.restaurants;
      } else {
        console.error("Hubo un error");
      }
    });
  }

  getRestaurantByCity(){
    if(this.ciudad===""){
      this.ngOnInit();
    }else{
      const formattedCity = this.formatCityName(this.ciudad); // Formatear la ciudad ingresada

      this.restaurantsService.getRestaurantByCity(formattedCity).subscribe((res: any) => {
        if (res && res.restaurantes.length > 0) {
          this.allRestaurants = res.restaurantes;
        }
      }, (error) => {
        console.error("Hubo un error en la búsqueda de la ciudad:", error);
      });
    }

  }

  getRestaurantByCategory(categoria:string){
    this.categoria = categoria;
    console.log(this.categoria);
    this.restaurantsService.getRestaurantByCategory(this.categoria).subscribe((res:any)=>{
      if(res){
        console.log("Se encontraron los restaurantes");
        this.allRestaurants = res.restaurantes;
      }else{
        console.error("Hubo un error");
      }
    })
  }

  // Asegurar correcta busqueda de ciudad.

  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos
  }

  formatCityName(city: string): string {
    const cityWithoutAccents = this.removeAccents(city); // Eliminar tildes
    return cityWithoutAccents
      .trim() // Eliminar espacios al principio y al final
      .toLowerCase() // Convertir todo a minúsculas
      .split(' ') // Separar palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
      .join(' '); // Unirlas de nuevo
  }
  

  // Método de inicialización
  ngOnInit() {
    if(this.ciudad==="" && this.categoria===""){
      this.getRestaurants();
    }else if(!(this.ciudad==="") && this.categoria===""){
      this.getRestaurantByCity();
    }else{
      this.getRestaurantByCategory(this.categoria);
    }
  }
}