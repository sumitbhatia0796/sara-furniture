import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderModule } from './main-header/main-header.module';
import { MainPageModule } from './main-page/main-page.module';
import { SideNavbarModule } from './side-navbar/side-navbar.module';
import { FooterModule } from './footer/footer.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from  '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalLoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MainHeaderModule,
    MainPageModule,
    SideNavbarModule,
    FooterModule,
    AuthModule,
    HttpClientModule ,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
