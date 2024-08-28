import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked  {
  
  itemsInCart: any[] = [];
  totalPrice: number = 0;
  additionalComments: string = ''; 
  cartItemCount: number = 0;
  visibleDescription: string | null = null; // Propiedad para controlar qué descripción está visible

  constructor(private location: Location, public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
      this.totalPrice = this.cartService.getTotalPrice();
      this.cartItemCount = this.cartService.getItemCount();
    });
  }
  ngAfterViewChecked(): void {
    this.initializeCollapse();
  }

  initializeCollapse(): void {
    this.itemsInCart.forEach(item => {
      const collapseElement = document.getElementById('description' + item._id);
      if (collapseElement) {
        new bootstrap.Collapse(collapseElement, {
          toggle: false
        });
      }
    });
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: string, change: number) {
    this.cartService.updateQuantity(itemId, change);
  }

  goBack() {
    this.location.back(); 
  }
}