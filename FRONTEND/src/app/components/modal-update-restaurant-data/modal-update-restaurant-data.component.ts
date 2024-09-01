import { Component, inject } from '@angular/core';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modal-update-restaurant-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-update-restaurant-data.component.html',
  styleUrl: './modal-update-restaurant-data.component.css'
})
export class ModalUpdateRestaurantDataComponent {
  panelMenu = inject(MenuRestauranteComponent);
  restauranteService = inject(RestaurantService);

  restaurantToUpdate : any = this.panelMenu.restaurantToUpdate;
  restaurantId : string = this.panelMenu.restaurantUpdateId;
  nombre : string = this.restaurantToUpdate.nombre;
  ciudad : string = this.restaurantToUpdate.ciudad;
  correoElectronico : string = this.restaurantToUpdate.correoElectronico;
  categoria: string = this.restaurantToUpdate.categoria;
  descripcion : string = this.restaurantToUpdate.descripcion;
  direccion : string = this.restaurantToUpdate.direccion;
  menu : any = this.restaurantToUpdate.menu;
  logo : string = this.restaurantToUpdate.logo;

  updateRestaurant(){
    if(this.restaurantId){
      this.restauranteService.putRestaurant(this.nombre, this.ciudad, this.correoElectronico,this.categoria, this.descripcion, this.direccion, this.menu, this.logo, this.restaurantId).subscribe((res:any)=>{
        if(res){
          this.panelMenu.isUpdatingRestaurant = false;
          this.resetForm();
          this.panelMenu.ngOnInit();
        }else{
          console.error("Hubo un error al actualizar restaurante");
          this.panelMenu.isUpdatingRestaurant = false;
        }
      })
    }
  }

  closeModal(){
    this.panelMenu.isUpdatingRestaurant = false;
  }

  resetForm(){
    this.nombre = "";
    this.ciudad = "";
    this.correoElectronico = "";
    this.categoria = "";
    this.descripcion = "";
    this.direccion = "";
    this.menu = [];
    this.logo = "";
  }
}
