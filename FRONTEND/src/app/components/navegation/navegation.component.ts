import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink, CommonModule, CartComponent],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent {
  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible = false;
  itemsInCart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
    });
  }

  // Listeners para manejar el menú desplegable
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.userIcon')) {
      this.hideDropdown();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    this.hideTimeout = setTimeout(() => {
      this.isDropdownVisible = false;
    }, 500);
  }

  hideDropdown() {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = false;
  }


}