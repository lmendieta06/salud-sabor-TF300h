import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject = new BehaviorSubject<any[]>([]);
  itemsInCart$ = this.itemsInCartSubject.asObservable();

  addToCart(dish: any) {
    console.log('Dish being added:', dish);  // Agrega esta línea para verificar
    const currentItems = this.itemsInCartSubject.value;
    // Aquí puedes incluir toda la información del platillo
    this.itemsInCartSubject.next([...currentItems, { ...dish, quantity: 1 }]);
  }

  removeFromCart(itemId: string) {
    console.log(`Removing item with id: ${itemId}`);  // Verificación
    const currentItems = this.itemsInCartSubject.value.filter(item => item._id !== itemId);
    this.itemsInCartSubject.next(currentItems);
    console.log('Items after removal:', this.itemsInCartSubject.value);  // Verificación
  }


  getTotalPrice() {
    return this.itemsInCartSubject.value.reduce((acc, item) => acc + item.precioPlato * item.quantity, 0);
  }

}
