import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanelAdministradoresComponent } from '../panel-administradores/panel-administradores.component';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-add-admin',
  standalone: true,
  imports: [FormsModule, PanelAdministradoresComponent],
  templateUrl: './modal-add-admin.component.html',
  styleUrl: './modal-add-admin.component.css'
})
export class ModalAddAdminComponent {
  adminService = inject(AdminService);
  panelAdmin = inject(PanelAdministradoresComponent);

  nombre:string = "";
  correoElectronico:string="";
  contrasena:string="";

  agregarAdmin() {
    const administradorInfo = {
      nombre: this.nombre,
      correoElectronico: this.correoElectronico,
      contrasena: this.contrasena
    };

    this.adminService.createAdmin(administradorInfo).subscribe((res: any) => {
        if (res) {
          this.panelAdmin.isAdding = false;
          this.resetForm();
          this.panelAdmin.getAdmins();
          Swal.fire("Se creo administrador satisfactoriamente");
        }else{
          console.error("Hubo un error: ");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          this.panelAdmin.isAdding = false;
  
        }

    });
  }

  cerrarModal() {
    this.panelAdmin.isAdding = false;
  }

  private resetForm() {
    this.nombre = "";
    this.correoElectronico = "";
    this.contrasena = "";
  }

}
