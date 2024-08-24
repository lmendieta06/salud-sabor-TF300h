import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: any[] = [];
  totalPrice: number = 0;
  additionalComments: string = ''; // Almacena los comentarios del usuario

  constructor(private location: Location, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }
}