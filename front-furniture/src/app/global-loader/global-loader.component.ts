import { Component } from '@angular/core';
import { UtillService } from '../services/utill.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent {
  isLoading: boolean = false;

  constructor(private UtillService: UtillService) { }

  ngOnInit(): void {
    this.UtillService.isLoading$.subscribe(isLoading => {
      console.log(this.isLoading)
      this.isLoading = isLoading;
    });
  }
}
