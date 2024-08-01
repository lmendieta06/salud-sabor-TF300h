import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [NavegationComponent, FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
