import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';
import { UtillService } from 'src/app/services/utill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  intialImgUrl = './../../assets/';
  productHome: any;
  constructor(private CommonServiceService: CommonServiceService , private UtillService:UtillService
    , private _router:Router
  ) { }
  ngOnInit(): void {
    this.UtillService.show();
   this.CommonServiceService.homeProducts().subscribe((res:any)=>{ 
    if(!!res){
      this.UtillService.hide();

      this.productHome = res
      console.log(this.productHome);
    } else {
       alert("error while fetching home product");
    }
    
   })
}
getSelectedCategoryProduct(e:string){
      console.log(e);
      this._router.navigate(['/our-products'], {queryParams: {id: e}});
      

}
}

