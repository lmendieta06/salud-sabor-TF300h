import { Component, HostListener, OnInit } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../../interfaces/dish';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category.types';


@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [ FooterComponent, CartComponent, CommonModule ],
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css']
})
export class MenuRestaurantComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: { [key in Category]?: Dish[] } = {};
  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible = false;
  itemsInCart: any[] = [];

  constructor(public cartService: CartService, private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
    });
  }
  loadDishes(): void {
    this.dishService.getDishes().subscribe(
      response => {
        console.log('Response from server:', response); // Verifica la respuesta
        this.dishes = response.dishes;
        this.filterDishesByCategory();
      },
      error => {
        console.error('Error loading dishes', error);
      }
    );
  }
  filterDishesByCategory(): void {
    this.filteredDishes = this.dishes.reduce((acc, dish) => {
      // Asegurarse de que la categoría es válida
      if (isCategory(dish.categoriaMenu)) {
        const category = dish.categoriaMenu as Category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category]!.push(dish);
      } else {
        console.warn(`Categoría desconocida: ${dish.categoriaMenu}`);
      }
      return acc;
    }, {} as { [key in Category]?: Dish[] });
  }



  addDishToCart(dish: Dish) {
    this.cartService.addToCart(dish);
  }

  // Listeners para manejar el menú desplegable
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.userIcon')) {
      this.hideDropdown();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = true;
    console.log('Dropdown visible:', this.isDropdownVisible);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    this.hideTimeout = setTimeout(() => {
      this.isDropdownVisible = false;
      console.log('Dropdown visible:', this.isDropdownVisible);
    }, 500);
  }

  hideDropdown() {
    clearTimeout(this.hideTimeout);
    this.isDropdownVisible = false;
  }
}

// Función  verificar categorías
function isCategory(value: any): value is Category {
  return [
    'entradas',
    'carnes',
    'pastas',
    'ensaladas',
    'bebidas',
    'platos fuertes',
    'postres'
  ].includes(value);
}