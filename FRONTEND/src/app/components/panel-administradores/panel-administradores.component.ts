import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AdminResponse } from '../../../interfaces/adminRes';
import { AdminInterface } from '../../../interfaces/adminInterface';
@Component({
  selector: 'app-panel-administradores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-administradores.component.html',
  styleUrl: './panel-administradores.component.css'
})
export class PanelAdministradoresComponent {
  adminService = inject(AdminService);

  Admins : AdminInterface [] = [];

  getAdmins(){
    this.adminService.getAdmins().subscribe((res:AdminResponse) =>{
      if (res && res.admins){
        this.Admins = res.admins;
        console.log('Administradores:', this.Admins);
      }else{
        console.error("Hubo un error");
      }
    })
  }

  // Se llama cuando el componente se inicializa
  ngOnInit() {
    this.getAdmins();
  }
}
