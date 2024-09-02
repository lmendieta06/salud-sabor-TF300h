import { Component, inject } from '@angular/core';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
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
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.panelMenu.isUpdatingRestaurant = false;
        }
      });

    }else{
      console.error("Hubo un error");
      this.panelMenu.isUpdatingRestaurant = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
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
