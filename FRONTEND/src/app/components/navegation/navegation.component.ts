import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css'] // Corregido a styleUrls
})
export class NavegationComponent {
  isDropdownVisible: boolean = false;
  private hideTimeout: any;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Si el clic no es dentro del dropdown o el icono de usuario, oculta el dropdown
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.userIcon')) {
      this.hideDropdown();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    this.hideTimeout = setTimeout(() => {
      this.isDropdownVisible = false;
    }, 500);
  }

  hideDropdown() {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = false;
  }
}