import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }
  gettickets(){
    return this.http.get('api/ticket/getticket');
  }
  maketickets(ID, Issue, Location, Date, User_ID): Observable<any>{
    return this.http.post('/api/ticket/maketicket', {'ID': ID, 'Issue': Issue,'Location': Location, 'Date': Date,'User_ID': User_ID});
  }
}
