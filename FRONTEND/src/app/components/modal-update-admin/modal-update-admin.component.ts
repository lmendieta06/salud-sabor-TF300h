import { Component, inject } from '@angular/core';
import { PanelAdministradoresComponent } from '../panel-administradores/panel-administradores.component';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
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
       
    this.adminService.updateAdmin(this.adminId, administradorInfo).subscribe((res:any) => {
      if(res){
        this.panelAdmin.isUpdating = false;
        this.resetForm();
        this.panelAdmin.getAdmins();
      }else{
        console.error("Hubo un error");
        this.panelAdmin.isUpdating = false;
      }
    }) 

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
