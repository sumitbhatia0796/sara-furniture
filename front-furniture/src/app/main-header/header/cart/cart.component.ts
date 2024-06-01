import { AfterViewInit, Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: any;
  itemPrice: any;
  couponVal: any = 'NA';
  discountPrice: number = 0; // Initialize discount price
  tax: number = 0; // Initialize tax
  finalPrice: number = 0; // Initialize final price

  constructor(private commonService: CommonServiceService, private utilService: UtillService) { }

  initialImgUrl = './../../assets/product-details-images/';
  filterObj: any;

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    this.filterObj = {
      userId: 'userid'
    };
    this.utilService.show();
    this.commonService.cartList({ filter: JSON.stringify(this.filterObj) }).subscribe((res: any) => {
      if (res) {
        this.utilService.hide();
        this.cartList = res;
        console.log(this.cartList);
        this.utilService.updateCartCount(this.cartList.length);
        this.getTotalPurchaseValue(this.cartList);
      } else {
        alert("Error while fetching Cart List");
      }
    });
  }

  removeItemsFromCart(id: string) {
    this.commonService.removeItemToCart(id).subscribe({
      next: (res: any) => {
        alert("Item Removed");
        this.getCartList();
      },
      error: (error: any) => {
        console.error("Error:", error);
        // Handle parsing error or any other error as needed
      }
    });
  }

  applyCoupon(val: string) {
    if (val === 'SARA') {
      if (this.discountPrice === 0) { // Check if discount has not been applied already
        this.discountPrice = 100;
        this.finalPrice -= this.discountPrice;
      } else {
        alert("Coupon 'SARA' already applied.");
      }
    } else {
      this.discountPrice = 0;
       alert("Invalid coupon or coupon already applied.");
    }
  }

  getTotalPurchaseValue(items: any[]) {
    let totalPrice = 0; // Initialize total price accumulator

    for (const item of items) {
      const itemPrice = item.price * item.quantitySelected;
      totalPrice += itemPrice; // Accumulate item price to total price
    }

    this.itemPrice = parseFloat(totalPrice.toFixed(1));
    this.tax = parseFloat((this.itemPrice * 0.18).toFixed(1)); // Apply 18% tax
    this.finalPrice = parseFloat((this.itemPrice + this.tax).toFixed(1));
  }
}
