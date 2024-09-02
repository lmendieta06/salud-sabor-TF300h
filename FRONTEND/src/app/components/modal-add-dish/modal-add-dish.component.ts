import { Component, inject } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-add-dish',
  standalone: true,
  imports: [FormsModule,  MenuRestauranteComponent],
  templateUrl: './modal-add-dish.component.html',
  styleUrl: './modal-add-dish.component.css'
})
export class ModalAddDishComponent {
  dishService = inject(DishService);
  menuService = inject(MenuService);
  panelMenu = inject(MenuRestauranteComponent);

  nombrePlato : string = "";
  categoriaMenu : string = "";
  descripcionPlato : string = "";
  imagenPlato : string = "";
  precioPlato : string = "";


  addDish() {
    const dishInfo = {
      nombrePlato: this.nombrePlato,
      categoriaMenu: this.categoriaMenu,
      descripcionPlato: this.descripcionPlato,
      imagenPlato: this.imagenPlato,
      precioPlato: this.precioPlato
    };

    this.dishService.postDish(dishInfo).subscribe((res: any) => {
      if (res) {
        this.panelMenu.menu.dishes.push(res.datos);
        this.menuService.updateMenuById(this.panelMenu.restaurantRecibido.menu, this.panelMenu.menu).subscribe((menuRes: any) => {
          if (menuRes) {
            this.panelMenu.isAddingDish = false;
            this.resetForm();
            Swal.fire("Se creo plato satisfactoriamente");
          } else {
            console.error("Hubo un error al agregar y actualizar plato");
            this.panelMenu.isAddingDish = false;
          }
        });
      } else {
        console.error("Hubo un error");
        this.panelMenu.isAddingDish = false;
      }
    });
  }

  cerrarModal() {
    this.panelMenu.isAddingDish = false;
  }

  private resetForm() {
    this.nombrePlato = "";
    this.categoriaMenu = "";
    this.descripcionPlato = "";
    this.imagenPlato = "";
    this.precioPlato = "";
  }
}
