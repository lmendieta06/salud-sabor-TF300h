import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-panel-administradores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-administradores.component.html',
  styleUrl: './panel-administradores.component.css'
})
export class PanelAdministradoresComponent {
  // adminService = inject(AdminService);

  // Admins : any [] = [];

  // getAdmins(){
  //   this.adminService.getAdmins().subscribe((res) =>{
  //     if (res){
  //       this.Admins = res;
  //     }else{
  //       console.error("Hubo un error");
  //     }
  //   })
  // }
}
