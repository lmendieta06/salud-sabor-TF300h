import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { RouterLink } from '@angular/router';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavegationComponent, RouterLink, ChatBotComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
