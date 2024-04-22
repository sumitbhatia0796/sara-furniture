import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

interface UserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    mobile: number;
    dataOfBirth: string;
    gender: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pin: number;
}

@Injectable({
  providedIn: 'root'
})


export class CommonServiceService {

  constructor(private ApiServiceService: ApiServiceService) { }

  registerUser(data:object){
    //send request to save the user 
    return this.ApiServiceService.post('user',data)
  }
  homeProducts(){
    //send request to save the user 
    return this.ApiServiceService.get('productHome')
  }
  
}
