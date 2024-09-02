import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AdminResponse } from '../../../interfaces/adminRes';
import { AdminInterface } from '../../../interfaces/adminInterface';
import { ModalAddAdminComponent } from '../modal-add-admin/modal-add-admin.component';
import { ModalUpdateAdminComponent } from '../modal-update-admin/modal-update-admin.component';
import Swal from 'sweetalert2';

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
  }

  deleteAdmin(id:string){
    if(id){
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No es posible revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.deleteAdmin(id).subscribe((req:any) =>{
            if(req){
              this.getAdmins();
            }else{
              console.error("Hubo un error");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El ID no existe",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
          })
          Swal.fire({
            title: "¡Eliminado!",
            text: "El administrador ha sido eliminado",
            icon: "success"
          });
        }
      });

    }else{
      console.error("ID no esta definido");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El ID no existe",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  // Se llama cuando el componente se inicializa
  ngOnInit() {
    this.getAdmins();
  }
}
