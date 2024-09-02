import { Component, inject } from '@angular/core';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { DishService } from '../../services/dish.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-update-dish',
  standalone: true,
  imports: [MenuRestauranteComponent, FormsModule],
  templateUrl: './modal-update-dish.component.html',
  styleUrl: './modal-update-dish.component.css'
})
export class ModalUpdateDishComponent {
  dishService = inject(DishService);
  panelMenu = inject(MenuRestauranteComponent);

  dishUpdate : any = this.panelMenu.dishToUpdate;
  dishId : string = this.panelMenu.dishToUpdateId;
  nombrePlato : string = this.dishUpdate.nombrePlato;
  categoriaMenu : string = this.dishUpdate.categoriaMenu;
  descripcionPlato : string = this.dishUpdate.descripcionPlato;
  imagenPlato : string = this.dishUpdate.imagenPlato;
  precioPlato : string = this.dishUpdate.precioPlato;

  updateDish(){
    const dishInfo = {
      nombrePlato : this.nombrePlato,
      categoriaMenu : this.categoriaMenu,
      descripcionPlato : this.descripcionPlato,
      imagenPlato : this.imagenPlato,
      precioPlato : this.precioPlato
    }

    if(this.dishId){
      Swal.fire({
        title: "¿Deseas guardar cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Guardado!", "", "success");
          this.dishService.updateDish(this.dishId, dishInfo).subscribe((res:any) =>{
            if(res){
              this.panelMenu.isUpdatingDish = false;
              this.resetForm();
              this.panelMenu.ngOnInit();
            }else{
              console.error("Hubo un error al actualizar platillo");
              this.panelMenu.isUpdatingDish = false;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Los cambios no han sido guardados", "", "info");
          this.panelMenu.isUpdatingMenu = false;
        }
      });
    }else{
      console.error("Hubo un error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  cerrarModal() {
    this.panelMenu.isUpdatingDish = false;
  }

  private resetForm() {
    this.nombrePlato = "";
    this.categoriaMenu = "";
    this.descripcionPlato = "";
    this.imagenPlato = "";
    this.precioPlato = "";
  }

}
