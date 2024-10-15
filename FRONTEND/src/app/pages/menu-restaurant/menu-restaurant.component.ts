import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { CartService } from '../../services/cart.service';
import { Dish } from '../../../interfaces/dish';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category.types';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';

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
  restaurantName:string = "";
  isDropdownVisible: boolean = false;
  menu: any = {};
  isCartVisible = false;
  itemsInCart: any[] = [];
  restaurantRecibido: any = {};

  constructor(
    public cartService: CartService, 
    private route: ActivatedRoute,  // Para obtener el restaurantId desde la ruta
    private restaurantService: RestaurantService,
    private menuService : MenuService
  ) {}

  ngOnInit(): void {
    // Obtener el restaurantId desde la ruta
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    
    if (restaurantId) {
      this.loadDishesByRestaurant(restaurantId);
    } else {
      console.error("ID del restaurante no encontrado en los parámetros de la ruta");
    }

    this.cartService.itemsInCart$.subscribe(items => {
      this.itemsInCart = items;
    });
  }

  loadDishesByRestaurant(restaurantId: string): void {
    this.restaurantService.getRestaurantById(restaurantId).subscribe((res: any) => {
      if (res) {
        this.restaurantRecibido = res;
        this.restaurantName = res.nombre;
        this.getMenuById(this.restaurantRecibido.menu);
      } else {
        console.error("Hubo un error al obtener el restaurante");
      }
    });
  }

  getMenuById(id: string): void {
    if (id) {
        this.menuService.getMenuById(id).subscribe((req: any) => {
          if (req) {
            // console.log("Respuesta "+req);
            this.menu = req.datos; 
            this.dishes = this.menu.dishes;
            this.filterDishesByCategory();
            // console.log(this.menu.dishes);
          } else {
            console.error("Hubo un error al obtener el menú");
          }
        })
    } else {
      console.error("No se encontró el id del menú");
    }
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