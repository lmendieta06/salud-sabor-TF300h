import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.css'
})
export class NavegationComponent {
  toggleMenu() {
    const menu = document.querySelector('.dropdown-menu');

    if (menu?.classList.contains('show')) {
      menu.classList.remove('show');
      menu.classList.add('hide');
    } else {
      menu?.classList.remove('hide');
      menu?.classList.add('show');
    }
  }

}
