import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [NavegationComponent],
  templateUrl: './menu-restaurant.component.html',
  styleUrl: './menu-restaurant.component.css'
})
export class MenuRestaurantComponent {

}
