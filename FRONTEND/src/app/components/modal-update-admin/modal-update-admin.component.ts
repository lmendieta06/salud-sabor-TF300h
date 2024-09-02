import { Component, inject } from '@angular/core';
import { PanelAdministradoresComponent } from '../panel-administradores/panel-administradores.component';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-update-admin',
  standalone: true,
  imports: [PanelAdministradoresComponent, FormsModule],
  templateUrl: './modal-update-admin.component.html',
  styleUrl: './modal-update-admin.component.css'
})
export class ModalUpdateAdminComponent {
  adminService = inject(AdminService);
  panelAdmin = inject(PanelAdministradoresComponent);

  adminUpdate : any = this.panelAdmin.adminToUpdate;
  adminId : string = this.panelAdmin.adminToUpdateId;
  nombre:string = this.adminUpdate.nombre;
  correoElectronico:string= this.adminUpdate.correoElectronico;
  contrasena:string="";


  actualizarAdmin(){
    const administradorInfo = {
      nombre : this.nombre,
      correoElectronico : this.correoElectronico,
      contrasena : this.contrasena
    };

    if(this.adminId){

      Swal.fire({
        title: "¿Deseas guardar cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Guardado!", "", "success");
          this.adminService.updateAdmin(this.adminId, administradorInfo).subscribe((res:any) => {
            if(res){
              this.panelAdmin.isUpdating = false;
              this.resetForm();
              this.panelAdmin.getAdmins();
            }else{
              console.error("Hubo un error");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
              this.panelAdmin.isUpdating = false;
            }
          }) 
        } else if (result.isDenied) {
          Swal.fire("Los cambios no han sido guardados", "", "info");
        }
      });

    }else{
      this.panelAdmin.isUpdating = false;
      console.error("Hubo un error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  cerrarModal() {
    this.panelAdmin.isUpdating = false;
  }
  
  private resetForm() {
    this.nombre = "";
    this.correoElectronico = "";
    this.contrasena = "";
  }
}
