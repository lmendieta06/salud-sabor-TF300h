import { Component, Input , inject, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service.js';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modal-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-menu.component.html',
  styleUrl: './modal-menu.component.css'
})
export class ModalMenuComponent {

  menuService = inject(MenuService);
  @Input() idMenu : string = "";
  @Input() nameRestaurant : string = "";
  @Input() isVisible : boolean = false;
  menu : any = {};
  subscription: Subscription = new Subscription();

    // Se ejecuta cada vez que hay un cambio en los @Input

  ngOnChanges(changes: SimpleChanges): void {
    // Se activa cuando cambia la visibilidad y hay un ID de menú
    if (changes['isVisible'] && this.isVisible && this.idMenu) {
      this.getMenuById(this.idMenu);
    }
  }

  getMenuById(id: string): void {
    if (id) {
      this.subscription.add(
        this.menuService.getMenuById(id).subscribe((req: any) => {
          if (req) {
            console.log(req);
            this.menu = req.datos; 
            console.log(this.menu.dishes);
          } else {
            console.error("Hubo un error al obtener el menú");
          }
        })
      );
    } else {
      console.error("No se encontró el id del menú");
    }
  }

  closeModal(){
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
