import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuBarComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    FormsModule
  ],
  exports :[
    HeaderComponent,
    MenuBarComponent
  ]
})
export class MainHeaderModule { }
