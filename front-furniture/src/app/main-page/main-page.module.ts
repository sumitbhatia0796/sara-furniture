import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestDealComponent } from './best-deal/best-deal.component';
import { RouterModule } from '@angular/router';
import { OurServiceComponent } from './our-service/our-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    BestDealComponent,
    OurServiceComponent,
    AboutUsComponent,
    OurProductsComponent,
    HomeComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule

    
  ],
 
  exports: [
  ]
})
export class MainPageModule { }
