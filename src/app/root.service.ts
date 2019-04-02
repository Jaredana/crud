import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RootService {

  constructor(private http: HttpClient) { }
  getAPIData(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  postAPIData(email, password){
    return this.http.post('/api/auth/login', {'email' : email, 'password' : password})
  }
}
