import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestDealComponent } from './best-deal/best-deal.component';
import { RouterModule } from '@angular/router';
import { OurServiceComponent } from './our-service/our-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { HomeComponent } from './home/home.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailsComponent } from './our-products/product-details/product-details.component';
import { UtillService } from '../services/utill.service';

@NgModule({
  declarations: [
    BestDealComponent,
    OurServiceComponent,
    AboutUsComponent,
    OurProductsComponent,
    HomeComponent,
    SlideshowComponent,
    ProductDetailsComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatInputModule
  ],
 
  exports: [
  ]
})
export class MainPageModule { }
