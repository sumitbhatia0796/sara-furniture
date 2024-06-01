import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId:any;
  productDetails:any;
  intialImgUrl = './../../assets/product-details-images/';
  quantity: number = 1;
  
  constructor(private ActivatedRoute:ActivatedRoute ,private CommonServiceService: CommonServiceService, private router:Router
    , private UtillService:UtillService
   ){
    this.ActivatedRoute.queryParams.subscribe(params => {
      console.log("hii",params)
       this.productId = params['id'];
    })
    this.UtillService.show();
    this.CommonServiceService.productDetail(this.productId).subscribe((res:any)=>{ 
      if(!!res){
        this.UtillService.hide();
        this.productDetails = res
        console.log(this.productDetails);
      } else {
         alert("error while fetching home product");
      }
      
     })

  }

  activeTab: string = 'ex1-pills-1'; // Default to the first tab

  showTabContent(tabId: string) {
    // Hide all tab content
    this.activeTab = tabId;
    const tabContents = document.querySelectorAll('.tab-pane');
    console.log(tabContents)
    tabContents.forEach((element: Element) => {
      element.classList.remove('show');
      element.classList.remove('active');
    });

    // Show the clicked tab content
    const tabContent = document.getElementById(tabId);
    console.log(tabContent)
    if (tabContent) {
      tabContent.classList.add('show', 'active');
    }
  }
  addToCart(){
    const cartObj = {
      productName : this.productDetails?.productName,
      image: this.productDetails?.images[0],
      price: this.productDetails?.price,
      quantitySelected: this.quantity,
      brand: this.productDetails?.brand,
      productId: this.productDetails?.productId ,
      productDetailId: this.productDetails?.productDetailId,
      userId: "userid"
    }
    this.CommonServiceService.addItemToCart(cartObj).subscribe((res:any)=>{
      if (!!res) {
        // Redirect to home page
        alert("Item added in cart Successfully")
        this.router.navigate(['cart']);
    } else {
      alert("there is a error")
        // Handle error or display appropriate message
        console.error('Error occurred while add item in cart');
    }
    })
    
  }
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
