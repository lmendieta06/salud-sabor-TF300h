import { Component, inject } from '@angular/core';
import { MenuRestauranteComponent } from '../menu-restaurante/menu-restaurante.component';
import { MenuService } from '../../services/menu.service';
import { FormsModule } from '@angular/forms';

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
      this.menuService.updateMenuById(this.menuId, menuInfo).subscribe((res:any)=>{
        if(res){
          this.panelMenu.isUpdatingMenu = false;
          this.resetForm();
          this.panelMenu.ngOnInit();
        }else{
          console.error("Hubo un error al actualizar un menú");
          this.panelMenu.isUpdatingMenu = false;
        }
      })
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
