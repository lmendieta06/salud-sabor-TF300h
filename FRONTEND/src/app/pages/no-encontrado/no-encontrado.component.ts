import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [NavegationComponent, FooterComponent, ChatBotComponent],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent {

}
