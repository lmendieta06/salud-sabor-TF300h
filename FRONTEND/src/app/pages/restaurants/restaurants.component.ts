import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [NavegationComponent, RouterLink],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {

}
