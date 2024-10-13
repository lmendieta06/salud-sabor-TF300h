import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdministradoresComponent } from '../../components/panel-administradores/panel-administradores.component';
import { PanelRestaurantesComponent } from '../../components/panel-restaurantes/panel-restaurantes.component';
import { PanelUusariosComponent } from '../../components/panel-uusarios/panel-uusarios.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet ,RouterLink, CommonModule, PanelAdministradoresComponent, PanelRestaurantesComponent, PanelUusariosComponent, DashboardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  viewMenu : boolean = false;
  loginService = inject(LoginService);
  isInRouter : boolean = false;
  isHovered: boolean = false; // Indica si el menú está siendo "hovered"
  changeMenu(){
    this.viewMenu = !this.viewMenu;
  }

  logout(): void {
    this.loginService.logout();
  }

  changeRoute(){
    this.isInRouter = true;
  }

  closeMenu() {
    if (!this.isHovered) {
      this.viewMenu = false; // Cierra el menú solo si no está siendo hovered
    }
  }
  
  onMenuHover() {
    this.isHovered = true; // Cuando el mouse entra, se activa el hover
  }

  onMenuLeave() {
    this.isHovered = false; // Cuando el mouse sale, se desactiva el hover
    this.closeMenu(); // Cierra el menú al salir del hover
  }
}
