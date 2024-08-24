export interface Dish {
    _id?: string; // Agrega el ID si es necesario para la actualización o eliminación
    nombrePlato: string;
    categoriaMenu:['entradas',  'carnes', 'pastas','ensaladas', 'bebidas', 'platos fuertes', 'postres'],
    descripcionPlato?: string;
    imagenPlato?: string;
    precioPlato: number;
  }