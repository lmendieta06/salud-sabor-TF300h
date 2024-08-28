import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

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
      
      currentItems.push({ ...dish, quantity: 1 });
    }

    this.itemsInCartSubject.next([...currentItems]);

    // Muestra un mensaje de éxito
    this.showSuccessAlert();
  }

  removeFromCart(itemId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres quitar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const currentItems = this.itemsInCartSubject.value.filter(item => item._id !== itemId);
        this.itemsInCartSubject.next(currentItems);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado del carrito.',
          'success'
        );
      }
    });
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

  // Método para mostrar un mensaje de éxito
  private showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: 'El producto se ha agregado al carrito con éxito.',
      timer: 1500,  // Tiempo antes de cerrar automáticamente
      timerProgressBar: true,
      showConfirmButton: false, 
    });
  }
}