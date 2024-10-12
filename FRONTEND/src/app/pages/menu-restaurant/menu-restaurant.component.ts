import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { CartService } from '../../services/cart.service';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../../interfaces/dish';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category.types';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [RouterLink, FooterComponent, CartComponent, CommonModule, NavegationComponent, FooterComponent],
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css']
})
export class MenuRestaurantComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: { [key: string]: Dish[] } = {}; // Almacena los platos filtrados por categoría
  restaurantIds: string[] = ['66d37ddf78b7e97775715328', '66d5f6d14b8789545027001c', '66d5fc934b87895450270091'];

  isDropdownVisible: boolean = false;
  private hideTimeout: any;
  isCartVisible = false;
  itemsInCart: any[] = [];

  constructor(
    public cartService: CartService, 
    private dishService: DishService,
    private route: ActivatedRoute,  // Para obtener el restaurantId desde la ruta
    private http: HttpClient         // Para realizar la petición al backend
  ) {}

  ngOnInit(): void {
    // Obtener el restaurantId desde la ruta
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    
    if (restaurantId) {
      // Si existe el restaurantId, cargar los platos de ese restaurante
      this.loadDishesByRestaurant(restaurantId);
    }

    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
    });
  }

  

  // Método para cargar todos los platos (si se necesita en otro caso)
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
  loadDishesByRestaurant(restaurantId: string): void {
    this.http.get(`http://localhost:2000/dishes/restaurant/${restaurantId}`).subscribe(
      (response: any) => {
        console.log('Full response from backend:', response); // Verifica la estructura completa de la respuesta
  
        // Verifica si la respuesta tiene el formato esperado
        if (response && response.dishes && Array.isArray(response.dishes)) {
          this.dishes = response.dishes; // Si todo está bien, asigna los platos
          this.filterDishesByCategory(); // Luego llama a la función para filtrar
        } else {
          console.error('No dishes found or invalid response format:', response);
        }
      },
      error => {
        console.error('Error loading dishes by restaurant', error);
      }
    );
  }

  // Método para filtrar platos por categoría
  filterDishesByCategory(): void {
    // Reiniciar el objeto filteredDishes
    this.filteredDishes = {};
  
    this.dishes.forEach((dish) => {
      // Depurar si cada plato tiene categoría
      console.log('Dish:', dish);
      console.log('Category:', dish.categoriaMenu); // Para ver qué categoría tiene el plato
  
      if (dish.categoriaMenu && isCategory(dish.categoriaMenu)) {
        if (!this.filteredDishes[dish.categoriaMenu]) {
          this.filteredDishes[dish.categoriaMenu] = [];
        }
        this.filteredDishes[dish.categoriaMenu].push(dish);
      } else {
        console.warn(`Categoría inválida o faltante en el plato: ${dish.nombrePlato}`);
      }
    });
  
    console.log('Filtered dishes:', this.filteredDishes); // Para verificar la estructura de filteredDishes
  }
  

  // Método para agregar un plato al carrito
  addDishToCart(dish: Dish) {
    this.cartService.addToCart(dish);
  }
}

// Función para verificar si una categoría es válida
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