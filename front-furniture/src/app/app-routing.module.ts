import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { BestDealComponent } from './main-page/best-deal/best-deal.component';
import { OurServiceComponent } from './main-page/our-service/our-service.component';
import { AboutUsComponent } from './main-page/about-us/about-us.component';
import { OurProductsComponent } from './main-page/our-products/our-products.component';
import { HomeComponent } from './main-page/home/home.component';
import { authguardGuard } from './authguard.guard';
import { ProductDetailsComponent } from './main-page/our-products/product-details/product-details.component';
import { CartComponent } from './main-header/header/cart/cart.component';

const routes: Routes = [
  
  { path:  'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'best-deal', component: BestDealComponent },
  { path: 'our-service', component: OurServiceComponent, },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'our-products', component:OurProductsComponent},
  { path: 'product-details', component:ProductDetailsComponent},
  {path:  'cart' , component:CartComponent},

  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
