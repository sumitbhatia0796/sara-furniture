import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let isloggedId = localStorage.getItem("isloggedIn");
  if(isloggedId=="false"){
    alert("user not authorized ! Please login and try again")
    _router.navigate(['login']); 
    return false;
  } 
 
 
  return true;
};
