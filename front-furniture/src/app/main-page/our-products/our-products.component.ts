import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {

  
  showFilters: boolean = false;
  minPrice: number = 0;
  maxPrice =100000;
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
  categories:any;; // Define category array
  constructor( private _router:Router) { }
  isFilterBarCollapsed: boolean = true;
  ngOnInit(): void {
    this.toggleFilterBar();
    // Initialize filter options
    // this.brands = [...new Set(this.products.map(product => product.brand))];
    // this.subcategories = [...new Set(this.products.map(product => product.subcategory))];
    // this.categories = [...new Set(this.products.map(product => product.category))];
    // console.log(this.subcategories);

    // Initially, display all products
    this.subcategories = [{ subcategories: 'door1'},{ subcategories: 'bed1'}]; // Define subcategory array
    this.categories = [{ categories: 'door'},{ categories: 'bed'}]; // Define category array
    this.filteredProducts = this.products;
    this.brands = ['SARA','XYZ','HIMALAYA_FU'];
  }



  applyFilter() {
    let filterObj = {
      'category' : this.selectedCategory,
      'subcategory': this.selectedSubcategory
    }
  }
  toggleFilterBar() {
    this.isFilterBarCollapsed = !this.isFilterBarCollapsed;
  }
  outerFilter(){

  }
//  priceRange: number[] = [0, 200000]; // Set the initial price range
//   maxSliderValue: number = 100; // Maximum value of the slider

// onPriceRangeChange(event: Event) {
//   const sliderValue = parseInt((event.target as HTMLInputElement).value); // Get the slider value
//   const maxValue = 200000; // Set the maximum value of the price range

//   // Calculate the corresponding price range based on the slider value
//   const step = maxValue / this.maxSliderValue; // Calculate the step value for the slider
//   const minPrice = sliderValue * step;
//   const maxPrice = maxValue - ((this.maxSliderValue - sliderValue) * step);

//   // Update the price range array
//   this.priceRange = [minPrice, maxPrice];
//   console.log(this.priceRange)
// }
oneChangePR(e:any){
  console.log(e);
  this.maxPrice = this.priceRange
}
viewProductDetails(){
  this._router.navigate(['/product-details'])
  
}
oneChangeCat(){

}
oneChangeSubCat(){

}
}
