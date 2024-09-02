import { inject,Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "./login.service";
@Injectable({
    providedIn:'root'
})

export class RestaurantService{

    constructor(){}

    httpClient = inject(HttpClient);
    loginService = inject(LoginService);

    API_URL_GET = "http://localhost:2000/restaurants";
    API_URL_GET_ID = "http://localhost:2000/restaurants/:_id";
    API_URL_GET_CATEGORY = "http://localhost:2000/restaurants/category/:categoria";
    API_URL_GET_CITY = "http://localhost:2000/restaurants/city/:ciudad";
    API_URL_POST = "http://localhost:2000/restaurants";
    API_URL_PUT = "http://localhost:2000/restaurants/:_id";
    API_URL_DELETE = "http://localhost:2000/restaurants/:_id";

    private getAuthHeaders(): HttpHeaders {
        const token = this.loginService.getToken(); // Asegúrate de tener un método en LoginService que obtenga el token
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
    

    getRestaurants(){
        return this.httpClient.get(this.API_URL_GET);
    }

    getRestaurantByCategory(categoria:string){
        return this.httpClient.get(`${this.API_URL_GET_CATEGORY.replace(":categoria", categoria)}`);
    }

    getRestaurantByCity(ciudad:string){
        return this.httpClient.get(`${this.API_URL_GET_CITY.replace(":ciudad", ciudad)}`);
    }

    getRestaurantById(id:string){
        return this.httpClient.get(`${this.API_URL_GET_ID.replace(":_id",id)}`);
    }

    postRestaurant(nombre:string, ciudad:string, correoElectronico:string, categoria:string, descripcion:string, direccion:string, menu:{}, logo:string){
        
        const infoRestaurant ={
            nombre:nombre,
            ciudad:ciudad,
            correoElectronico:correoElectronico,
            categoria:categoria,
            descripcion:descripcion,
            direccion:direccion,
            menu:menu,
            logo:logo
        }

        return this.httpClient.post(`${this.API_URL_POST}`,infoRestaurant, { headers: this.getAuthHeaders() });
    }

    putRestaurant(nombre:string, ciudad:string, correoElectronico:string, categoria:string, descripcion:string, direccion:string, menu:Object, logo:string, id:string){
        
        const infoRestaurant ={
            nombre:nombre,
            ciudad:ciudad,
            correoElectronico:correoElectronico,
            categoria:categoria,
            descripcion:descripcion,
            direccion:direccion,
            menu:menu,
            logo:logo
        }

        return this.httpClient.put(`${this.API_URL_PUT.replace(":_id",id)}`, infoRestaurant, { headers: this.getAuthHeaders() });
    }

    deleteRestaurant(id:string){
        return this.httpClient.delete(`${this.API_URL_DELETE.replace(":_id",id)}`, { headers: this.getAuthHeaders() });
    }
}