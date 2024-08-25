import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject = new BehaviorSubject<any[]>([]);
  itemsInCart$ = this.itemsInCartSubject.asObservable();

  addToCart(dish: any) {
    const currentItems = this.itemsInCartSubject.value;
    const itemIndex = currentItems.findIndex(item => item._id === dish._id);
    if (itemIndex !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      currentItems[itemIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, añádelo
      currentItems.push({ ...dish, quantity: 1 });
    }

    this.itemsInCartSubject.next([...currentItems]);
  }

  removeFromCart(itemId: string) {
    const currentItems = this.itemsInCartSubject.value.filter(item => item._id !== itemId);
    this.itemsInCartSubject.next(currentItems);
  }


  updateQuantity(itemId: string, change: number) {
    const currentItems = this.itemsInCartSubject.value;
    const itemIndex = currentItems.findIndex(item => item._id === itemId);

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity += change;
      if (currentItems[itemIndex].quantity <= 0) {
        currentItems.splice(itemIndex, 1);
      }
    }

    this.itemsInCartSubject.next([...currentItems]);
  }


  getTotalPrice() {
    return this.itemsInCartSubject.value.reduce((acc, item) => acc + item.precioPlato * item.quantity, 0);
  }
  getItemCount() {
    return this.itemsInCartSubject.value.reduce((acc, item) => acc + item.quantity, 0);
  }
}

