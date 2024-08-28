import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdministradoresComponent } from '../../components/panel-administradores/panel-administradores.component';
import { PanelRestaurantesComponent } from '../../components/panel-restaurantes/panel-restaurantes.component';
import { PanelUusariosComponent } from '../../components/panel-uusarios/panel-uusarios.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PanelAdministradoresComponent, PanelRestaurantesComponent, PanelUusariosComponent, DashboardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isVisibleUsers : boolean = false;
  isVisibleAdmins : boolean = false;
  isVisibleDashboard : boolean = false;
  isVisibleRestaurants : boolean = true;

  // Ver panel restaurantes
  showRestaurants(){
    this.isVisibleRestaurants = true;
    this.isVisibleAdmins = false;
    this.isVisibleDashboard = false;
    this.isVisibleUsers = false;
  }
  // Ver panel usuarios
  showUsers (){
    this.isVisibleRestaurants = false;
    this.isVisibleAdmins = false;
    this.isVisibleDashboard = false;
    this.isVisibleUsers = true;
  }
  // Ver panel administradores
  showAdmins(){
    this.isVisibleRestaurants = false;
    this.isVisibleAdmins = true;
    this.isVisibleDashboard = false;
    this.isVisibleUsers = false;
  }
  // Ver dashboard
  showDashboard(){
    this.isVisibleRestaurants = false;
    this.isVisibleAdmins = false;
    this.isVisibleDashboard = true;
    this.isVisibleUsers = false;
  }
}
