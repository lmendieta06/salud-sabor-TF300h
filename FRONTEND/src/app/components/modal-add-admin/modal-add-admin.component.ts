import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanelAdministradoresComponent } from '../panel-administradores/panel-administradores.component';
import { AdminService } from '../../services/admin.service';
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
        }else{
          console.error("Hubo un error: ");
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
