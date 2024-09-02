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
    this.restaurantsService.getRestaurantByCity(this.ciudad).subscribe((res:any)=>{
      if(res){
        this.allRestaurants = res.restaurantes;
      }else{
        console.error("Hubo un error");
      }
    })
  }



  // Método de inicialización
  ngOnInit() {
    if(this.ciudad===""){
      this.getRestaurants();
    }else{
      this.getRestaurantByCity();

    }
  }
}