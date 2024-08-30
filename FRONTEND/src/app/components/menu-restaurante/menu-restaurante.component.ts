import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { ModalAddDishComponent } from '../modal-add-dish/modal-add-dish.component';
import { ModalUpdateDishComponent } from '../modal-update-dish/modal-update-dish.component';
import { ModalUpdateMenuDataComponent } from '../modal-update-menu-data/modal-update-menu-data.component';
import { ModalUpdateRestaurantDataComponent } from '../modal-update-restaurant-data/modal-update-restaurant-data.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-restaurante',
  standalone: true,
  imports: [CommonModule, ModalAddDishComponent, ModalUpdateRestaurantDataComponent, ModalUpdateMenuDataComponent, ModalUpdateDishComponent, RouterLink],
  templateUrl: './menu-restaurante.component.html',
  styleUrl: './menu-restaurante.component.css'
})
export class MenuRestauranteComponent {
  restaurantRecibido: any = {};
  menu: any = {};
  isAddingDish : boolean = false;
  isUpdatingDish : boolean = false;
  isUpdatingRestaurant : boolean = false;
  restaurantToUpdate : any[] = [];
  restaurantUpdateId : string = "";
  isUpdatingMenu : boolean = false;
  menuToUpdate : any[] = [];
  menuUpdateId : string = "";
  dishToUpdate : any [] = [];
  dishToUpdateId : string = "";

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private menuService : MenuService, private dishService : DishService) {}

  ngOnInit(): void {
    // Obtener el ID del restaurante desde los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('restauranteId');
    console.log(id);
    if (id) {
      this.getRestaurantByIdMenu(id);
    } else {
      console.error("ID del restaurante no encontrado en los parámetros de la ruta");
    }
  }

  getRestaurantByIdMenu(id: string){
    this.restaurantService.getRestaurantById(id).subscribe((res: any) => {
      if (res) {
        this.restaurantRecibido = res;
        this.getMenuById(this.restaurantRecibido.menu);
        console.log("Restaurante recibido:", this.restaurantRecibido);
      } else {
        console.error("Hubo un error al obtener el restaurante");
      }
    });
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

  addDishModal(){
    this.isAddingDish = true;
  }

  
  deleteDish(id:string){
    if(id){
      console.log(id);
      this.dishService.deleteDish(id).subscribe((req:any)=>{
        if(req){
          alert("Plato eliminado satisfactoriamente");
          this.ngOnInit();
        }else{
          console.error("Hubo un error al eliminar plato");
        }
      })
    }else{
      console.error("ID no esta definido");
    }
  }

  updateDishModal(dish:any){
    this.isUpdatingDish = true;
    this.dishToUpdate = dish;
    this.dishToUpdateId = dish._id;
  }

  updateRestaurant(restaurant : any){
    this.isUpdatingRestaurant = true,
    this.restaurantToUpdate = restaurant;
    this.restaurantUpdateId = restaurant._id;
  }

  updateMenu(menu:any){
    this.isUpdatingMenu = true;
    this.menuToUpdate = menu;
    this.menuUpdateId = menu._id;
  }
}

