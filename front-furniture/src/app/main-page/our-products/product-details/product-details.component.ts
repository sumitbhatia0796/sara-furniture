import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {


  activeTab: string = 'ex1-pills-1'; // Default to the first tab

  showTabContent(tabId: string) {
    // Hide all tab content
    this.activeTab = tabId;
    const tabContents = document.querySelectorAll('.tab-pane');
    console.log(tabContents)
    tabContents.forEach((element: Element) => {
      element.classList.remove('show');
      element.classList.remove('active');
    });

    // Show the clicked tab content
    const tabContent = document.getElementById(tabId);
    console.log(tabContent)
    if (tabContent) {
      tabContent.classList.add('show', 'active');
    }
  }
}
