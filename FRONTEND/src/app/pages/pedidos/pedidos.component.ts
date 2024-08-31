import { Component, OnInit } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NavegationComponent,FooterComponent,CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    // Simulación de datos, reemplazar con datos reales de un servicio
    this.pedidos = [
      { numeroOrden: '001', producto: 'Pizza Margherita', restaurante: 'La Pizzería', horaEjecucion: '12:30 PM' },
      { numeroOrden: '002', producto: 'Sushi Deluxe', restaurante: 'Sushi World', horaEjecucion: '1:00 PM' },
      { numeroOrden: '003', producto: 'Burger Clásica', restaurante: 'Burger House', horaEjecucion: '1:30 PM' },
      // Agrega más pedidos según sea necesario
    ];
  }

}
