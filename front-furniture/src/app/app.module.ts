import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderModule } from './main-header/main-header.module';
import { MainPageModule } from './main-page/main-page.module';
import { SideNavbarModule } from './side-navbar/side-navbar.module';
import { FooterModule } from './footer/footer.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
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
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
