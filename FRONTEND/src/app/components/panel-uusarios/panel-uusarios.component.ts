import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../interfaces/userInterface';
import { UserResponse } from '../../../interfaces/userResponse';

@Component({
  selector: 'app-panel-uusarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-uusarios.component.html',
  styleUrl: './panel-uusarios.component.css'
})
export class PanelUusariosComponent {
 userService = inject(UserService);

 allUsers : UserInterface [] = [];

 getUsers(){
  this.userService.getUsers().subscribe((res: UserResponse) => {
    if (res && res.users) {
      this.allUsers= res.users;
      console.log(this.allUsers);
    } else {
      console.error("Hubo un error");
    }
  });
 }

 ngOnInit(){
  this.getUsers();
 }
}
