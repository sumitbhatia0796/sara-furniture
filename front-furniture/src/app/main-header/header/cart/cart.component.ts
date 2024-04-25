import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

cartList:any;
 constructor(private CommonServiceService:CommonServiceService){

 }

  ngOnInit(): void {
    this.CommonServiceService.cartList().subscribe((res:any)=>{ 
      if(!!res){
        this.cartList = res
        console.log(this.cartList);
      } else {
         alert("error while fetching Cart List");
      }
      
     })
  }
}
