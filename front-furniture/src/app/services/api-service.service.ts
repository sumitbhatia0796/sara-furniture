import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
readonly Root_URL;
  constructor(private http: HttpClient) {
     this.Root_URL ='http://localhost:3000';
   }

   get(url:string) {
    console.log(url);
     return this.http.get(`${this.Root_URL}/api/v1/${url}`);
   }
   post(url:string, payload:object){
    console.log(payload)
    return this.http.post(`${this.Root_URL}/api/v1/${url}`, payload);
   }
   patch(url:string, payload:object){
    return this.http.patch(`${this.Root_URL}/api/v1/${url}`, payload);
   }
   delete(url:string) {
    return this.http.delete(`${this.Root_URL}/api/v1/${url}`);
  }
}
