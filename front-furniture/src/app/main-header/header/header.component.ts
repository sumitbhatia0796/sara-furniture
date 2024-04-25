import { Component, OnInit,ChangeDetectorRef, OnChanges  } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private CommonServiceService: CommonServiceService) {}
   name: any = '';
   isAuthenticated: boolean = false;
   username: string | null = null;

   ngOnInit(): void {
    this.CommonServiceService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      // Fetch username from local storage
      this.username = localStorage.getItem('name');
    });
  }
  
  logout(): void {
    this.CommonServiceService.logout();
  }
}
