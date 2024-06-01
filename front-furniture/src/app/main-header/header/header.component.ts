import { Component, OnInit,ChangeDetectorRef, OnChanges  } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UtillService } from 'src/app/services/utill.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private UtillService:UtillService,
     private CommonServiceService: CommonServiceService) {}
   name: any = '';
   isAuthenticated: boolean = false;
   username: string | null = null;
   cartCount:any;
   ngOnInit(): void {
    this.CommonServiceService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      // Fetch username from local storage
      this.username = localStorage.getItem('name');
    });
    this.UtillService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

    ngAfterViewInit(){
      this.UtillService.getCartCount().subscribe(count => {
        this.cartCount = count;
      });
  }
  logout(): void {
    this.CommonServiceService.logout();
  }
}
