import { Component, HostListener, OnInit } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { CartService } from '../../services/cart.service';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../../interfaces/dish';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category.types';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [RouterLink, FooterComponent, CartComponent, CommonModule,NavegationComponent,FooterComponent],
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


}

// Función para verificar categorías
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