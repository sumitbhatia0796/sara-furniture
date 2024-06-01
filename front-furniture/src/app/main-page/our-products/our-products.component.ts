import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {
  filterObj: any;
isValidInput() {
throw new Error('Method not implemented.');
}
  
  showFilters: boolean = false;
  minPrice = 0;
  maxPrice =200000;
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  selectedBrand: string = '';
  priceRange:any;
  products: any[] = [
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 3' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 2' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
    { name: 'chair', imageUrl: 'assets/chair-home.png', description: 'Description 1', price: 1000, category: 'Category 1' },
  ];
  filteredProducts: any[] = [];
  brands: any[] = []; // Define brand array
  subcategories: any; // Define subcategory array
  categories:any;
  minValue: number = 0; 
  maxValue: number = 200000;
  intialImgUrl = './../../assets/product/';
  homeProductCat:any;
  showProduct = false;
; // Define category array
  constructor( private _router:Router, private ActivatedRoute:ActivatedRoute, private CommonServiceService: CommonServiceService, private UtillService:UtillService) { }
  isFilterBarCollapsed: boolean = true;
  product:any | undefined;

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(params => {
       this.homeProductCat = params['id'];
    })
    this.toggleFilterBar();
    this.filterObj = {
      'homecategory': this.homeProductCat
    };
    this.UtillService.show();
    this.getProductList(this.filterObj);
    // this.CommonServiceService.productLists({ filter: JSON.stringify(this.filterObj) }).subscribe((res:any)=>{ 
    //   if(!!res){
    //     this.UtillService.hide();
    //     if(res.length){
    //       this.showProduct = true;

    //     }
    //     this.product = res
    //     console.log(this.product);
    //   } else {
    //      alert("error while fetching home product");
    //   }
      
    //  })
    this.subcategories = [{ subcategories: 'door1'},{ subcategories: 'bed1'}]; // Define subcategory array
    this.categories = [{ categories: 'Door'},{ categories: 'bed'}]; // Define category array
    this.filteredProducts = this.products;
    this.brands = ['SARA','XYZ','HIMALAYA_FU'];

   

  }

  getProductList(filter:any){
    this.UtillService.show();
    console.log(filter)
    this.CommonServiceService.productLists({ filter: JSON.stringify(filter) }).subscribe((res:any)=>{ 
      if(!!res){
        this.UtillService.hide();
        if(res.length){
          this.showProduct = true;
        }else{
          this.showProduct = false;
         
        }
        this.product = res
        console.log(this.product);
      } else {
         alert("error while fetching home product");
      }
      
     })
  }

  applyFilter() {
    let filterData = {
      'category' : this.selectedCategory,
      'subcategory': this.selectedSubcategory,
      'minValue' : this.minValue,
      'maxValue' : this.maxValue,
      'brand': this.selectedBrand
    }
   // this.getProductList({"productFilter": filterData});

    console.log(filterData);
    
  }
  toggleFilterBar() {
    this.isFilterBarCollapsed = !this.isFilterBarCollapsed;
  }
  outerFilter(){

  }
oneChangePR(e:any){
  console.log(e);
  this.maxPrice = this.priceRange
}
viewProductDetails(id:string){
  console.log(id)
  this._router.navigate(['/product-details'], {queryParams: {id:id}})
}
oneChangeCat(){

}
oneChangeSubCat(){

}
}
