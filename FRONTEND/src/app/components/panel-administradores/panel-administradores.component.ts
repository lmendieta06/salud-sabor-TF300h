import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AdminResponse } from '../../../interfaces/adminRes';
import { AdminInterface } from '../../../interfaces/adminInterface';
import { ModalAddAdminComponent } from '../modal-add-admin/modal-add-admin.component';
import { ModalUpdateAdminComponent } from '../modal-update-admin/modal-update-admin.component';
@Component({
  selector: 'app-panel-administradores',
  standalone: true,
  imports: [CommonModule, ModalAddAdminComponent, ModalUpdateAdminComponent],
  templateUrl: './panel-administradores.component.html',
  styleUrl: './panel-administradores.component.css'
})
export class PanelAdministradoresComponent {
  adminService = inject(AdminService);

  Admins : AdminInterface [] = [];
  isAdding : boolean = false;
  isUpdating : boolean = false;
  adminToUpdateId : string = "";
  adminToUpdate : any [] = [];

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

  openModalAddAdmin(){
    this.isAdding = true;
  }

  openModelUpdateAdmin(admin:any){
    this.isUpdating = true;
    this.adminToUpdateId = admin._id;
    this.adminToUpdate = admin;

    console.log(this.adminToUpdateId);
    console.log(this.adminToUpdate);
  }

  // Se llama cuando el componente se inicializa
  ngOnInit() {
    this.getAdmins();
  }
}
