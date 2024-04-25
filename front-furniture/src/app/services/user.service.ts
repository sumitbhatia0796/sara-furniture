import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private ApiServiceService: ApiServiceService) { }

  login(data:object){
    //send request to save the user 

    return this.ApiServiceService.post('users/login',data)
  }

}
