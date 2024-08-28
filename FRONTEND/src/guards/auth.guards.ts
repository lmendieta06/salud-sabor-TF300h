import { CanActivateFn } from "@angular/router";
import { LoginService } from "../app/services/login.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";


export const authGuard : CanActivateFn = ( route, state)=>{

    //dependencias
    const router = inject(Router);
    const loginService = inject(LoginService);

      // si no está logueado -> no debe acceder
  if(!loginService.isLogged()){
    router.navigate(['/']);
    return false
  }

  // si el usuario logueado no es administrador -> no debe acceder
  if(!loginService.isAdmin()){
    router.navigate(['/']);
    return false
  }

  return true;
};
