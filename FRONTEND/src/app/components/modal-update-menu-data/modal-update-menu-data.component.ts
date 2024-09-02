import { Component, inject } from '@angular/core';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { MenuService } from '../../services/menu.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-menu-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-update-menu-data.component.html',
  styleUrl: './modal-update-menu-data.component.css'
})
export class ModalUpdateMenuDataComponent {
  menuService = inject(MenuService);
  panelMenu = inject(MenuRestauranteComponent);

  menuUpdate : any = this.panelMenu.menuToUpdate;
  menuId : string = this.panelMenu.menuUpdateId;
  title : string = this.menuUpdate.title;
  imgLogo : string = this.menuUpdate.imgLogo;
  category : {} = this.menuUpdate.category;
  dishes : {} = this.menuUpdate.dishes;

  updateMenu(){
    const menuInfo = {
      title : this.title,
      imgLogo : this.imgLogo,
      category : this.category,
      dishes : this.dishes
    }

    if(this.menuId){
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
          this.menuService.updateMenuById(this.menuId, menuInfo).subscribe((res:any)=>{
            if(res){
              this.panelMenu.isUpdatingMenu = false;
              this.resetForm();
              this.panelMenu.ngOnInit();
            }else{
              console.error("Hubo un error al actualizar un menú");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
              this.panelMenu.isUpdatingMenu = false;
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
      this.panelMenu.isUpdatingMenu = false;
    }
  }

  closeModal(){
    this.panelMenu.isUpdatingMenu = false;
  }

  private resetForm(){
    this.title = "";
    this.imgLogo = "";
    this.category = {};
    this.dishes = {};
  }
}
