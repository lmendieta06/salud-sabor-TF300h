import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';
import { MenuService } from '../../services/menu.service';
@Component({
  selector: 'app-panel-restaurantes',
  standalone: true,
  imports: [CommonModule, ModalMenuComponent],
  templateUrl: './panel-restaurantes.component.html',
  styleUrl: './panel-restaurantes.component.css'
})
export class PanelRestaurantesComponent {
  restaurantService = inject(RestaurantService);
  menuService = inject(MenuService);

  allRestaurants : any [] = [];
  menu : any = {};
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

    // console.log(this.selectedRestaurantId);
    // console.log(this.selectedRestaurantName);
  }

  getMenuById(id: string): void {
    if (id) {
        this.menuService.getMenuById(id).subscribe((req: any) => {
          if (req) {
            // console.log("Respuesta "+req);
            this.menu = req.datos; 
            console.log("Menu "+this.menu);
            // console.log(this.menu.dishes);
          } else {
            console.error("Hubo un error al obtener el menú");
          }
        })
    } else {
      console.error("No se encontró el id del menú");
    }
  }

  handleVerMenu(restaurant:any){
    console.log("Esta es la informacion del restaurante "+restaurant);
    console.log("Id del menú "+restaurant.menu)
    this.openMenuModal(restaurant);
    this.getMenuById(restaurant.menu);
  }

  closeModal(){
    this.isModalVisible = false;
    this.menu = {};
  }
}
