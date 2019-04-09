import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket} from '../ticket'
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }
  
  gettickets(): Observable<any>{
    return this.http.get('api/ticket/getticket');
  }
  maketickets(ID, Issue, Location, my_Date, User_ID): Observable<any>{
    return this.http.post('/api/ticket/maketicket', {'ID': ID, 'Issue': Issue,'Location': Location, 'Date': my_Date,'User_ID': User_ID});
  }
}
