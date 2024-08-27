import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';
@Component({
  selector: 'app-panel-restaurantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-restaurantes.component.html',
  styleUrl: './panel-restaurantes.component.css'
})
export class PanelRestaurantesComponent {
  restaurantService = inject(RestaurantService);

  allRestaurants : any [] = [];
  selectedRestaurantId: string = "";
  selectedRestaurantName: string = "";
  isModalVisible: boolean = false;
  
  getRestaurants(){
    this.restaurantService.getRestaurants().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.allRestaurants = res.restaurants;
      }else{
        console.error("Hubo un error");
      }
    })
  }

  deleteRestaurant(id:string){
    if(id){
      this.restaurantService.deleteRestaurant(id).subscribe((req:any)=>{
        if(req){
          console.log(req);
          alert("Producto eliminado");
          this.getRestaurants();
        }else{
          console.error("Hubo un error");
        }
      })
    }else{
      console.error("ID no esta definido")
    }
  }

  // Hace que se rendericen los productos
  ngOnInit(){
    this.getRestaurants();
  }


  openMenuModal(restaurant:any): void {
    this.selectedRestaurantId = restaurant.menu; // Asume que `restaurant.menu` es el ID del menú
    this.selectedRestaurantName = restaurant.nombre;
    this.isModalVisible = true;
  }
}
