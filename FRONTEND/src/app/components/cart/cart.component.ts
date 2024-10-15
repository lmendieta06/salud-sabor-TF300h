import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit  {
  
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
  ngAfterViewInit(): void {
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


  public mostrarMensajePago() {
    if (this.cartItemCount === 0) { // Verificar si el carrito está vacío
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No puedes proceder con la compra porque tu carrito está vacío.',
        icon: 'warning',
        confirmButtonText: 'Regresar'
      });
      return;
    }

    Swal.fire({
      title: 'Pasarela en Mantenimiento, recibiremos tu pago por WhatsApp',
      text: 'Actualmente la pasarela de pago está en mantenimiento. Puedes realizar tu pago a través de los siguientes métodos y recibiremos por whatsapp:',
      icon: 'info',
      html: `
        <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap;">
          <div style="margin: 10px;">
            <img src="assets/logos/daviplata.png" alt="Daviplata" style="width: 80px; height: auto;">
            <p>Daviplata</p>
          </div>
          <div style="margin: 20px;">
            <img src="assets/logos/nequi.png" alt="Nequi" style="width: 80px; height: auto;">
            <p>Nequi</p>
          </div>
          <div style="margin: 20px;">
            <img src="assets/logos/bancolombia.png" alt="Bancolombia" style="width: 80px; height: auto;">
            <p>Bancolombia</p>
          </div>
          <div style="margin: 20px;">
            <img src="assets/logos/otrosbancos.png" alt="Otros Bancos" style="width: 80px; height: auto;">
            <p>Otros Bancos</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Regresar',
      cancelButtonText: 'OK, ir a WhatsApp',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.open('https://wa.me/1234567890', '_blank');
      }
    });
  }
}