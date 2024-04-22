import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  intialImgUrl = './../../assets/';
  productHome: any;
  constructor(private CommonServiceService: CommonServiceService) { }
  ngOnInit(): void {

   this.CommonServiceService.homeProducts().subscribe((res:any)=>{ 
    if(!!res){
      this.productHome = res
      console.log(this.productHome);
    } else {
       alert("error while fetching home product");
    }
    
   })
}
getSelectedCategoryProduct(e:string){
      console.log(e);
}
}

