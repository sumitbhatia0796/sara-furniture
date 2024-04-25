import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId:any;
  productDetails:any;
  intialImgUrl = './../../assets/product-details-images/';

  
  constructor(private ActivatedRoute:ActivatedRoute ,private CommonServiceService: CommonServiceService ){
    this.ActivatedRoute.queryParams.subscribe(params => {
      console.log("hii",params)
       this.productId = params['id'];
      
    })
    this.CommonServiceService.productDetail(this.productId).subscribe((res:any)=>{ 
      if(!!res){
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
}
