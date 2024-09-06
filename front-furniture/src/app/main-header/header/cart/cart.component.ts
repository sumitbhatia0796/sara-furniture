import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: any;
  itemPrice: number = 0;
  couponVal: string = 'NA';
  discountPrice: number = 0;
  tax: number = 0;
  finalPrice: number = 0;
  initialImgUrl: string = './../../assets/product-details-images/';
  filterObj: any;

  constructor(private commonService: CommonServiceService, private utilService: UtillService) { }

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    this.filterObj = { userId: 'userid' };
    this.utilService.show();
    this.commonService.cartList({ filter: JSON.stringify(this.filterObj) }).subscribe({
      next: (res: any) => {
        this.utilService.hide();
        if (res) {
          this.cartList = res;
          console.log(this.cartList);
          this.utilService.updateCartCount(this.cartList.length);
          this.getTotalPurchaseValue(this.cartList);
        } else {
          alert('Error while fetching Cart List');
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.utilService.hide();
      }
    });
  }

  removeItemsFromCart(id: string) {
    this.commonService.removeItemToCart(id).subscribe({
      next: () => {
        alert('Item Removed');
        this.getCartList();
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  applyCoupon(val: string) {
    if (val === 'SARA' && this.discountPrice === 0) {
      this.discountPrice = 100;
      this.finalPrice -= this.discountPrice;
    } else if (val !== 'SARA') {
      this.discountPrice = 0;
      alert('Invalid coupon');
    } else {
      alert("Coupon 'SARA' already applied.");
    }
  }

  getTotalPurchaseValue(items: any[]) {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price * item.quantitySelected;
    });
    this.itemPrice = parseFloat(totalPrice.toFixed(1));
    this.tax = parseFloat((this.itemPrice * 0.18).toFixed(1)); // Apply 18% tax
    this.finalPrice = parseFloat((this.itemPrice + this.tax).toFixed(1));
  }
}
