import { Component, Inject, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { DishService } from '../../services/dish.service';
import { MenuService } from '../../services/menu.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalDishesTableComponent } from '../modal-dishes-table/modal-dishes-table.component';
import { info } from 'console';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ModalDishesTableComponent],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  restaurantService = inject(RestaurantService);
  dishService = inject(DishService);
  menuService =inject(MenuService);

  // DISHES
  nombrePlato : string = "";
  categoriaPlato : string = "";
  descripcionPlato : string = "";
  imagenPlato : string = "";
  precioPlato : string = "";

  // MENU
  imgLogo : string = "";
  categoriaMenu : string = "";
  dishesMenu : any[] = [];

  // RESTAURANT
  nombreRestaurant : string = "";
  ciudad : string = "";
  correoElectronico : string = "";
  categoriaRestaurant : string = "";
  descripcion : string = "";
  direccion : string = "";
  menu : any = {};

  // CONTROL
  isDishes : boolean = false;
  isAddingDishes : boolean = false;

  ngOnInit(){
    this.verificarPlatos();
  }

  verificarPlatos(){
    if(!(this.dishesMenu.length === 0)){
      this.isDishes = true;
    }
  }

  addingDishes(){
    this.isAddingDishes = true;
  }

  // PLATOS

  // RESTAURANTE Y MENÚ
  addRestaurant(){

    const infoMenu = {
      title : this.nombreRestaurant,
      imgLogo : this.imgLogo,
      category : this.categoriaMenu,
      dishes : this.dishesMenu

    }

    try{

      this.menuService.postMenu(infoMenu).subscribe((res:any) =>{
        if(res){
          this.menu = res.datos;
          this.restaurantService.postRestaurant(this.nombreRestaurant, this.ciudad, this.correoElectronico, this.categoriaRestaurant, this.descripcion, this.direccion, this.menu._id, this.imgLogo).subscribe((res:any)=>{
            if(res){
              alert("Se creo el restaurante satisfactoriamente");
              
              Swal.fire("Se creo el restaurante exitosamente");
            }else{
              console.error("Error al crear el restaurante");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
          })
        }else{
          console.error("Hubo un error al crear menú");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      })



    }catch(error){
      console.error("Hubo un error con la funcion "+ error)
    }
  }

  deleteDish(dishId : any){
    try{
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No es posible revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dishService.deleteDish(dishId).subscribe((res:any)=>{
            if(res){
              this.dishesMenu = this.dishesMenu.filter(dish => dish._id !== dishId);
              this.ngOnInit();
            }else{
              console.error("No se pudo eliminar el platillo");
            }
          })
          Swal.fire({
            title: "¡Eliminado!",
            text: "El plato ha sido eliminado",
            icon: "success"
          });
        }
      });

    }catch(error){
      console.error(" Hubo un error con la petición", error);
    }
  }
}
