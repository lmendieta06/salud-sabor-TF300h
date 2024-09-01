import { Component, inject } from '@angular/core';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { DishService } from '../../services/dish.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
          alert("Se creo el plato exitosamente");
          console.log(res);
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
      this.dishesService.deleteDish(dish._id).subscribe((res:any)=>{
        if(res){
          alert("Se elimino el plato exitosamente");
          // ELIMINAR EL DATO DEL ARREGLO
          const dishIdDelete = dish._id;
          this.dishes = this.dishes.filter(dish => dish._id !== dishIdDelete);
          this.panelAddRestaurant.verificarPlatos();
          console.log(this.dishes.length);
          this.panelAddRestaurant.dishesMenu = this.dishes;

        }
      })
    }catch(error){
      console.log("Hubo un error al eliminar producto" + error);
    }
  }

  addDishesToMenu(){
    this.panelAddRestaurant.dishesMenu = this.dishes;
    alert("Platos creados exitosamente");
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
