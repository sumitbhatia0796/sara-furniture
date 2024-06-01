import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtillService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();
  constructor() { }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  getCartCount(): Observable<number> {
    return this.cartCount$;
  }
  show(): void {
    this.isLoadingSubject.next(true);
}

hide(): void {
    this.isLoadingSubject.next(false);
}
}
