import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panel-uusarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-uusarios.component.html',
  styleUrl: './panel-uusarios.component.css'
})
export class PanelUusariosComponent {
 userService = inject(UserService);

 allUsers : any [] = [];

 getUsers(){
  this.userService.getUsers().subscribe((res: any) => {
    if (res) {
      this.allUsers= res;
    } else {
      console.error("Hubo un error");
    }
  });
 }
}
