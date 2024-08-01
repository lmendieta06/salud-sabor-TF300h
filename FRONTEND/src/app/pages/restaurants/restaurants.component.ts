import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [NavegationComponent, RouterLink, FooterComponent, ChatBotComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {

}
