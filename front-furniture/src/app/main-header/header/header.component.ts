import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = null;
  cartCount: number = 0;

  constructor(
    private commonService: CommonServiceService,
    private utilService: UtillService
  ) {}

  ngOnInit(): void {
    this.commonService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.username = localStorage.getItem('name');
    });

    this.utilService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  logout(): void {
    this.commonService.logout();
  }
}
