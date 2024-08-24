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
    // Aquí puedes incluir toda la información del platillo
    this.itemsInCartSubject.next([...currentItems, { ...dish, quantity: 1 }]);
  }

  removeFromCart(itemId: string) {
    const currentItems = this.itemsInCartSubject.value.filter(item => item.id !== itemId);
    this.itemsInCartSubject.next(currentItems);
  }



  getTotalPrice() {
    return this.itemsInCartSubject.value.reduce((acc, item) => acc + item.precioPlato * item.quantity, 0);
  }

}
