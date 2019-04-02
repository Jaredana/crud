import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }
  helper = new JwtHelperService();
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.helper.isTokenExpired(token);
  }
  
  postAPIData(email, password): Observable<any>{
    return this.http.post('/api/auth/login', {'email' : email, 'password' : password});
  }
}
