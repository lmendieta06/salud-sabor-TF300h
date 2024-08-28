import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiagramaBarrasComponent } from '../diagrama-barras/diagrama-barras.component';
import { DiagramaVentasComponent } from '../diagrama-ventas/diagrama-ventas.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DiagramaBarrasComponent, DiagramaVentasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
