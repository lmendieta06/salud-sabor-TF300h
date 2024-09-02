import { Component, inject } from '@angular/core';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { DishService } from '../../services/dish.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-dishes-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-dishes-table.component.html',
  styleUrl: './modal-dishes-table.component.css'
})
export class ModalDishesTableComponent {

  panelAddRestaurant = inject(AddRestaurantComponent);
  dishesService = inject(DishService);

  nombrePlato : string = "";
  categoriaMenu : string = "";
  descripcionPlato : string = "";
  imagenPlato : string = "";
  precioPlato : string = "";
  dishes : any[] = this.panelAddRestaurant.dishesMenu;

  addDish(){
    const dishInfo = {
      nombrePlato: this.nombrePlato,
      categoriaMenu: this.categoriaMenu,
      descripcionPlato: this.descripcionPlato,
      imagenPlato: this.imagenPlato,
      precioPlato: this.precioPlato
    };

    try{
      this.dishesService.postDish(dishInfo).subscribe((res:any)=>{
        if(res){
          Swal.fire("Se creo plato satisfactoriamente");
          this.resetForm();
          this.dishes.push(res.datos);
        }else{
          console.error("Hubo un error al crear el platillo")
          this.panelAddRestaurant.isAddingDishes = false;
        }
      })
    }catch(error){
      console.error("Hubo un error al hacer la peticion" + error);
      this.panelAddRestaurant.isAddingDishes = false;
    }
  }

  deleteDish(dish : any){
    try{
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No es posible revertir este",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dishesService.deleteDish(dish._id).subscribe((res:any)=>{
            if(res){
              // ELIMINAR EL DATO DEL ARREGLO
              const dishIdDelete = dish._id;
              this.dishes = this.dishes.filter(dish => dish._id !== dishIdDelete);
              this.panelAddRestaurant.verificarPlatos();
              this.panelAddRestaurant.dishesMenu = this.dishes;
    
            }else{
              console.error("Hubo un error");
              Swal.fire({
                title: "¡Eliminado!",
                text: "El plato ha sido eliminado",
                icon: "success"
              });
              this.panelAddRestaurant.dishesMenu = this.dishes;

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
      this.panelAddRestaurant.dishesMenu = this.dishes;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El ID no existe",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  addDishesToMenu(){
    this.panelAddRestaurant.dishesMenu = this.dishes;
    Swal.fire("Se agregaron platos exitosamente");
    this.panelAddRestaurant.ngOnInit();
    this.closeModal();

  }

  closeModal(){
    this.panelAddRestaurant.isAddingDishes = false;
  }

  private resetForm() {
    this.nombrePlato = "";
    this.categoriaMenu = "";
    this.descripcionPlato = "";
    this.imagenPlato = "";
    this.precioPlato = "";
  }
}
