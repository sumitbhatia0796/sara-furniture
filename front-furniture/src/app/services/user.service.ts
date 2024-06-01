import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private ApiServiceService: ApiServiceService) { }

  login(data:object){
    return this.ApiServiceService.post('users/login',data)
  }

}
