import { Component } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-recipes-tips',
  standalone: true,
  imports: [NavegationComponent, FooterComponent, ChatBotComponent],
  templateUrl: './recipes-tips.component.html',
  styleUrl: './recipes-tips.component.css'
})
export class RecipesTipsComponent {

}
