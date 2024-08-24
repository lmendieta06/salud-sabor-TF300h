import { Component, HostListener } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [ FooterComponent, CartComponent,CommonModule],
  templateUrl: './menu-restaurant.component.html',
  styleUrl: './menu-restaurant.component.css'
})
export class MenuRestaurantComponent {
  constructor(private cartService: CartService) {}

  addDishToCart(dish: any) {
    this.cartService.addToCart(dish);
  }
  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible = false;
  itemsInCart: any[] = [];

 

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
