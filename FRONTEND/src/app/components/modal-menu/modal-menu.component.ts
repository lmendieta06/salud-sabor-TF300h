import { Component, Input , inject, Output, EventEmitter} from '@angular/core';
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
  @Input() menu : any = {};
  @Output() closeModalEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() closeModal(){};

}
