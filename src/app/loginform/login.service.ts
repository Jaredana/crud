import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  postAPIData(email, password){
    return this.http.post('/api/auth/login', {'email' : email, 'password' : password})
  }
}
