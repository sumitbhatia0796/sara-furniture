import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { BehaviorSubject ,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CommonServiceService {


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private ApiServiceService: ApiServiceService) { 
    this.isAuthenticatedSubject.next(this.isLoggedIn());
  }

  registerUser(data:object){
    //send request to save the user 
    return this.ApiServiceService.post('users',data)
  }
  homeProducts(){
    //send request to save the user 
    return this.ApiServiceService.get('productHome')
  }
  productLists(){
    return this.ApiServiceService.get('product')
  }
  
  productDetail(id:string){
    console.log(id);
    const productUrl = `productDetail/ByProductID/${id}`
    return this.ApiServiceService.get(productUrl);
  }
  cartList(){
    return this.ApiServiceService.get('cart');
  }


  login(username: string, token: string): void {
    // Store user information in local storage
    localStorage.setItem('name', username);
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    // Remove user information from local storage
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
  private isLoggedIn(): boolean {
    // Check if user information exists in local storage
    return !!localStorage.getItem('token');
  }
}
